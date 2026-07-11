#!/usr/bin/env python3
"""
Prüft alle lokalen Asset-Bilder gegen Cloudinary und lädt fehlende hoch.
Fokus: portraits-typen, vergleiche, edelsteine und alle anderen schaubilder.
"""

import os, json, subprocess, time, hashlib, urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
env = {}
with open(os.path.join(SCRIPT_DIR, ".env")) as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()

CLOUD_NAME = env["CLOUDINARY_CLOUD_NAME"]
API_KEY    = env["CLOUDINARY_API_KEY"]
API_SECRET = env["CLOUDINARY_API_SECRET"]

ASSETS_DIR    = os.path.join(SCRIPT_DIR, "assets")
SCHAUBILDER   = os.path.join(ASSETS_DIR, "schaubilder")
CDN_BASE      = f"https://res.cloudinary.com/{CLOUD_NAME}/image/upload/f_auto,q_auto/kompass/assets/"
CLOUD_FOLDER  = "kompass/assets"

def cloudinary_exists(public_id):
    # Construct CDN URL and check HTTP status
    ext = os.path.splitext(public_id)[1].lstrip(".")
    if not ext:
        return False
    name_no_ext = public_id.rsplit(".", 1)[0]
    url = f"{CDN_BASE}{name_no_ext}.{ext}"
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status == 200
    except Exception:
        return False

def cloudinary_upload(file_path, public_id):
    ts = str(int(time.time()))
    folder = CLOUD_FOLDER
    sign_str = f"folder={folder}&public_id={public_id}&timestamp={ts}{API_SECRET}"
    sig = hashlib.sha1(sign_str.encode()).hexdigest()
    r = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload",
        "-F", f"file=@{file_path}",
        "-F", f"api_key={API_KEY}",
        "-F", f"timestamp={ts}",
        "-F", f"signature={sig}",
        "-F", f"folder={folder}",
        "-F", f"public_id={public_id}",
    ], capture_output=True, text=True)
    try:
        data = json.loads(r.stdout)
        url = data.get("secure_url")
        if url:
            return True, url
        else:
            return False, data.get("error", {}).get("message", r.stdout[:200])
    except Exception:
        return False, r.stdout[:200]

def collect_files():
    """Walk assets/ and return list of (local_path, public_id) pairs."""
    result = []

    # 1. portraits-typen (top-level schaubilder subfolder)
    portraits_dir = os.path.join(SCHAUBILDER, "portraits-typen")
    if os.path.isdir(portraits_dir):
        for f in sorted(os.listdir(portraits_dir)):
            if not f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                continue
            local = os.path.join(portraits_dir, f)
            # Convert spaces to underscores for public_id
            safe_name = f.replace(" ", "_")
            public_id = f"portraits-typen/{safe_name}"
            result.append((local, public_id))

    # 2. All other schaubilder subfolders
    for subdir in sorted(os.listdir(SCHAUBILDER)):
        if subdir == "portraits-typen":
            continue
        sub_path = os.path.join(SCHAUBILDER, subdir)
        if not os.path.isdir(sub_path):
            continue
        for f in sorted(os.listdir(sub_path)):
            if not f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                continue
            local = os.path.join(sub_path, f)
            public_id = f"schaubilder/{subdir}/{f}"
            result.append((local, public_id))

    # 3. vergleiche
    vergl_dir = os.path.join(ASSETS_DIR, "vergleiche")
    if os.path.isdir(vergl_dir):
        for f in sorted(os.listdir(vergl_dir)):
            if not f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                continue
            local = os.path.join(vergl_dir, f)
            public_id = f"vergleiche/{f}"
            result.append((local, public_id))

    return result

def main():
    files = collect_files()
    print(f"=== Asset-Upload Check ===")
    print(f"Gefundene lokale Dateien: {len(files)}\n")

    missing   = []
    present   = []

    print("Prüfe Cloudinary-Verfügbarkeit...")
    for local, pid in files:
        exists = cloudinary_exists(pid)
        if exists:
            present.append(pid)
        else:
            missing.append((local, pid))

    print(f"Vorhanden: {len(present)}")
    print(f"Fehlend:   {len(missing)}\n")

    if not missing:
        print("✓ Alle Assets sind auf Cloudinary vorhanden.")
        return

    print("=== Lade fehlende Assets hoch ===\n")
    ok_count = 0
    fail_count = 0

    for local, pid in missing:
        fname = os.path.basename(local)
        print(f"  ↑ {pid}", end=" ... ", flush=True)
        success, result = cloudinary_upload(local, pid)
        if success:
            print("✓")
            ok_count += 1
        else:
            print(f"✗ {result}")
            fail_count += 1
        time.sleep(0.2)

    print(f"\n=== Ergebnis ===")
    print(f"Hochgeladen: {ok_count}")
    if fail_count:
        print(f"Fehler:      {fail_count}")
    print("Fertig.")

if __name__ == "__main__":
    main()
