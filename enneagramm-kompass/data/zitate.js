// Zitate aus 2500 Jahren Weltgeschichte mit Enneagramm-Bezug
// Themen: Selbsterkenntnis · Leidenschaft & Schatten · Wachstum · Freiheit & Authentizität
//         Mitgefühl · Mut & Angst · Stille · Weisheit · Verbindung · Frieden

const zitateData = [

  // ── SELBSTERKENNTNIS ────────────────────────────────────────────────────
  { q: "Erkenne dich selbst.",
    a: "Inschrift am Orakel von Delphi", y: "ca. 500 v. Chr.", t: "Selbsterkenntnis" },

  { q: "Das ungeprüfte Leben ist nicht lebenswert.",
    a: "Sokrates", y: "469–399 v. Chr.", t: "Selbsterkenntnis" },

  { q: "Wer andere kennt, ist klug. Wer sich selbst kennt, ist weise.",
    a: "Laozi", y: "6. Jh. v. Chr.", t: "Selbsterkenntnis" },

  { q: "Bis du das Unbewusste bewusst machst, wird es dein Leben lenken und du wirst es Schicksal nennen.",
    a: "C. G. Jung", y: "1875–1961", t: "Selbsterkenntnis" },

  { q: "Es sind nicht die Dinge selbst, die uns beunruhigen, sondern die Vorstellungen, die wir uns von ihnen machen.",
    a: "Epiktet", y: "50–138 n. Chr.", t: "Selbsterkenntnis" },

  { q: "Jeder Mensch trägt die ganze Form der menschlichen Kondition in sich.",
    a: "Michel de Montaigne", y: "1533–1592", t: "Selbsterkenntnis" },

  { q: "Das Selbst ist ein Verhältnis, das sich zu sich selbst verhält.",
    a: "Søren Kierkegaard", y: "1813–1855", t: "Selbsterkenntnis" },

  { q: "Der größte Schaden für die Seele ist, wenn man sie nicht kennt.",
    a: "Teresa von Ávila", y: "1515–1582", t: "Selbsterkenntnis" },

  // ── LEIDENSCHAFT & SCHATTEN ─────────────────────────────────────────────
  { q: "Zwei Seelen wohnen, ach! in meiner Brust.",
    a: "Johann Wolfgang von Goethe", y: "1749–1832", t: "Leidenschaft & Schatten" },

  { q: "Wunden sind die Stellen, wo das Licht in uns eindringt.",
    a: "Dschalal ad-Din Rumi", y: "1207–1273", t: "Leidenschaft & Schatten" },

  { q: "Das Herz hat Gründe, die die Vernunft nicht kennt.",
    a: "Blaise Pascal", y: "1623–1662", t: "Leidenschaft & Schatten" },

  { q: "Aus bitterer Wurzel wächst süßer Honig.",
    a: "Dschalal ad-Din Rumi", y: "1207–1273", t: "Leidenschaft & Schatten" },

  { q: "Dein Schmerz ist der Bruch der Schale, die deinen Verstand umhüllt.",
    a: "Khalil Gibran", y: "1883–1931", t: "Leidenschaft & Schatten" },

  { q: "Alle Probleme des Menschen rühren daher, dass er nicht ruhig in einem Zimmer sitzen kann.",
    a: "Blaise Pascal", y: "1623–1662", t: "Leidenschaft & Schatten" },

  { q: "Der Geist ist alles. Was du denkst, das wirst du.",
    a: "Buddha (Dhammapada)", y: "5. Jh. v. Chr.", t: "Leidenschaft & Schatten" },

  // ── WACHSTUM & TRANSFORMATION ───────────────────────────────────────────
  { q: "Werde, der du bist.",
    a: "Friedrich Nietzsche (nach Pindar)", y: "1844–1900", t: "Wachstum" },

  { q: "Der Weg von tausend Meilen beginnt mit einem einzigen Schritt.",
    a: "Laozi", y: "6. Jh. v. Chr.", t: "Wachstum" },

  { q: "Ich lebe mein Leben in wachsenden Ringen, die sich über die Dinge der Welt ziehn.",
    a: "Rainer Maria Rilke", y: "1875–1926", t: "Wachstum" },

  { q: "Jeder denkt daran, die Welt zu verändern, aber niemand denkt daran, sich selbst zu verändern.",
    a: "Leo Tolstoi", y: "1828–1910", t: "Wachstum" },

  { q: "Sei du selbst die Veränderung, die du dir wünschst für diese Welt.",
    a: "Mahatma Gandhi", y: "1869–1948", t: "Wachstum" },

  { q: "Nur wer sich verändert, bleibt sich treu.",
    a: "Wolf Biermann", y: "geb. 1936", t: "Wachstum" },

  { q: "Wir müssen immer wieder versuchen, aufzusteigen, selbst wenn wir wissen, dass wir fallen werden.",
    a: "Albert Camus", y: "1913–1960", t: "Wachstum" },

  { q: "Das Ende aller Erkundung wird sein, dort anzukommen, wo wir begannen, und den Ort zum ersten Mal zu erkennen.",
    a: "T. S. Eliot", y: "1888–1965", t: "Wachstum" },

  // ── FREIHEIT & AUTHENTIZITÄT ────────────────────────────────────────────
  { q: "Die Angst ist der Schwindel der Freiheit.",
    a: "Søren Kierkegaard", y: "1813–1855", t: "Freiheit & Authentizität" },

  { q: "Nur wer sich selbst überwindet, ist stark.",
    a: "Laozi", y: "6. Jh. v. Chr.", t: "Freiheit & Authentizität" },

  { q: "Nur der verdient sich Freiheit wie das Leben, der täglich sie erobern muss.",
    a: "Johann Wolfgang von Goethe", y: "1749–1832", t: "Freiheit & Authentizität" },

  { q: "Um alles zu besitzen, darf man nichts zu besitzen begehren.",
    a: "Johannes vom Kreuz", y: "1542–1591", t: "Freiheit & Authentizität" },

  { q: "Die Wahrheit wird euch frei machen.",
    a: "Evangelium nach Johannes 8,32", y: "1. Jh. n. Chr.", t: "Freiheit & Authentizität" },

  { q: "Lebe jetzt die Fragen. Vielleicht lebst du dann allmählich, ohne es zu merken, eines fernen Tages in die Antwort hinein.",
    a: "Rainer Maria Rilke", y: "1875–1926", t: "Freiheit & Authentizität" },

  // ── MITGEFÜHL & LIEBE ───────────────────────────────────────────────────
  { q: "Unruhig ist unser Herz, bis es Ruhe findet in dir.",
    a: "Augustinus von Hippo", y: "354–430 n. Chr.", t: "Mitgefühl & Liebe" },

  { q: "Das Ich des Menschen wird am Du wirklich.",
    a: "Martin Buber", y: "1878–1965", t: "Mitgefühl & Liebe" },

  { q: "Lieben ist eine Kunst. Wer sie erlernen will, muss sie wie jede Kunst auch üben.",
    a: "Erich Fromm", y: "1900–1980", t: "Mitgefühl & Liebe" },

  { q: "Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.",
    a: "Antoine de Saint-Exupéry", y: "1900–1944", t: "Mitgefühl & Liebe" },

  { q: "Finsternis kann Finsternis nicht auslöschen, nur Licht kann das. Hass kann Hass nicht auslöschen, nur Liebe kann das.",
    a: "Martin Luther King", y: "1929–1968", t: "Mitgefühl & Liebe" },

  { q: "Die Schönheit wird die Welt retten.",
    a: "Fjodor Dostojewski", y: "1821–1881", t: "Mitgefühl & Liebe" },

  // ── MUT & ANGST ─────────────────────────────────────────────────────────
  { q: "Dem Mutigen hilft das Glück.",
    a: "Terenz", y: "195–159 v. Chr.", t: "Mut & Angst" },

  { q: "Während wir zögern, vergeht das Leben.",
    a: "Seneca", y: "4 v. Chr.– 65 n. Chr.", t: "Mut & Angst" },

  { q: "Man muss das Chaos in sich haben, um einen tanzenden Stern gebären zu können.",
    a: "Friedrich Nietzsche", y: "1844–1900", t: "Mut & Angst" },

  { q: "Mut ist nicht die Abwesenheit von Angst, sondern das Urteil, dass etwas anderes wichtiger ist.",
    a: "Ambrose Redmoon", y: "1933–1996", t: "Mut & Angst" },

  { q: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt unsere Freiheit.",
    a: "Viktor Frankl (zugeschrieben)", y: "1905–1997", t: "Mut & Angst" },

  // ── STILLE & KONTEMPLATION ──────────────────────────────────────────────
  { q: "Das Auge, mit dem ich Gott sehe, ist dasselbe Auge, mit dem Gott mich sieht.",
    a: "Meister Eckhart", y: "1260–1328", t: "Stille & Kontemplation" },

  { q: "Wer überall ist, ist nirgends.",
    a: "Seneca", y: "4 v. Chr.– 65 n. Chr.", t: "Stille & Kontemplation" },

  { q: "In der Stille findet die Seele ihre Reinheit wieder.",
    a: "Teresa von Ávila", y: "1515–1582", t: "Stille & Kontemplation" },

  { q: "Wer spricht von Siegen? Überstehen ist alles.",
    a: "Rainer Maria Rilke", y: "1875–1926", t: "Stille & Kontemplation" },

  // ── WEISHEIT & VOLLKOMMENHEIT ───────────────────────────────────────────
  { q: "Ich weiß, dass ich nichts weiß.",
    a: "Sokrates (nach Platon)", y: "469–399 v. Chr.", t: "Weisheit" },

  { q: "Fantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.",
    a: "Albert Einstein", y: "1879–1955", t: "Weisheit" },

  { q: "Man sieht nur, was man weiß.",
    a: "Johann Wolfgang von Goethe", y: "1749–1832", t: "Weisheit" },

  { q: "Besser als tausend sinnlose Worte ist ein einziges sinnvolles Wort, das Frieden stiftet.",
    a: "Buddha (Dhammapada)", y: "5. Jh. v. Chr.", t: "Weisheit" },

  // ── FRIEDEN & GELASSENHEIT ──────────────────────────────────────────────
  { q: "Der Starke ist am mächtigsten allein.",
    a: "Friedrich Schiller", y: "1759–1805", t: "Frieden & Gelassenheit" },

  { q: "Lass das Beste, was du bist, auch das Sichtbarste sein.",
    a: "Konfuzius", y: "551–479 v. Chr.", t: "Frieden & Gelassenheit" },


  // ── ZWEITE HÄLFTE ───────────────────────────────────────────────────────

  // Selbsterkenntnis
  { q: "Vor allem andern: bleib dir selbst treu.",
    a: "William Shakespeare", y: "1564–1616", t: "Selbsterkenntnis" },
  { q: "Wir wissen, was wir sind, aber nicht, was wir werden könnten.",
    a: "William Shakespeare", y: "1564–1616", t: "Selbsterkenntnis" },
  { q: "Man reist in alle Winkel der Welt und erstaunt über Berge, Meere und Sterne — und geht an sich selbst vorbei.",
    a: "Francesco Petrarca", y: "1304–1374", t: "Selbsterkenntnis" },
  { q: "Ich habe mich bemüht, nicht zu lachen, nicht zu weinen, nicht zu hassen, sondern zu verstehen.",
    a: "Baruch de Spinoza", y: "1632–1677", t: "Selbsterkenntnis" },
  { q: "Jeder Mensch nimmt die Grenzen seines eigenen Gesichtsfeldes für die Grenzen der Welt.",
    a: "Arthur Schopenhauer", y: "1788–1860", t: "Selbsterkenntnis" },
  { q: "Wisse, dass das Wissen um dich selbst der Schlüssel ist zur Erkenntnis Gottes.",
    a: "Al-Ghazali", y: "1058–1111", t: "Selbsterkenntnis" },
  { q: "Wo Es war, soll Ich werden.",
    a: "Sigmund Freud", y: "1856–1939", t: "Selbsterkenntnis" },

  // Leidenschaft & Schatten
  { q: "Auf halbem Wege unseres Lebens fand ich mich in einem dunklen Walde.",
    a: "Dante Alighieri", y: "1265–1321", t: "Leidenschaft & Schatten" },
  { q: "Ein Buch muss die Axt sein für das gefrorene Meer in uns.",
    a: "Franz Kafka", y: "1883–1924", t: "Leidenschaft & Schatten" },
  { q: "In der Tiefe des Winters entdeckte ich schließlich, dass in mir ein unbesiegbarer Sommer liegt.",
    a: "Albert Camus", y: "1913–1960", t: "Leidenschaft & Schatten" },
  { q: "Der Mensch kann tun, was er will; er kann aber nicht wollen, was er will.",
    a: "Arthur Schopenhauer", y: "1788–1860", t: "Leidenschaft & Schatten" },
  { q: "Aus meinen großen Schmerzen mach ich die kleinen Lieder.",
    a: "Heinrich Heine", y: "1797–1856", t: "Leidenschaft & Schatten" },
  { q: "Wo aber Gefahr ist, wächst das Rettende auch.",
    a: "Friedrich Hölderlin", y: "1770–1843", t: "Leidenschaft & Schatten" },
  { q: "Die Suche nach der Wahrheit ist wertvoller als ihr Besitz.",
    a: "Gotthold Ephraim Lessing", y: "1729–1781", t: "Leidenschaft & Schatten" },

  // Wachstum & Transformation
  { q: "Jedem Anfang wohnt ein Zauber inne, der uns beschützt und der uns hilft, zu leben.",
    a: "Hermann Hesse", y: "1877–1962", t: "Wachstum" },
  { q: "Nach innen geht der geheimnisvolle Weg. In uns oder nirgends ist die Ewigkeit mit ihren Welten.",
    a: "Novalis", y: "1772–1801", t: "Wachstum" },
  { q: "Es ist der Geist, der sich den Körper baut.",
    a: "Friedrich Schiller", y: "1759–1805", t: "Wachstum" },
  { q: "Einmal träumte mir, ich sei ein Schmetterling. Bin ich nun ein Mensch, der träumt, ein Schmetterling zu sein, oder ein Schmetterling, der träumt, ein Mensch zu sein?",
    a: "Zhuangzi", y: "4. Jh. v. Chr.", t: "Wachstum" },
  { q: "Verliere keine Zeit damit, darüber zu streiten, wie ein guter Mensch sein soll. Sei einer.",
    a: "Marcus Aurelius", y: "121–180 n. Chr.", t: "Wachstum" },
  { q: "Liebe das Leben mehr als seinen Sinn.",
    a: "Fjodor Dostojewski", y: "1821–1881", t: "Wachstum" },

  // Freiheit & Authentizität
  { q: "Die Existenz geht der Essenz voraus.",
    a: "Jean-Paul Sartre", y: "1905–1980", t: "Freiheit & Authentizität" },
  { q: "Das Bessere ist der Feind des Guten.",
    a: "Voltaire", y: "1694–1778", t: "Freiheit & Authentizität" },
  { q: "Der Weg ist immer besser als die Herberge.",
    a: "Miguel de Cervantes", y: "1547–1616", t: "Freiheit & Authentizität" },
  { q: "Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.",
    a: "Immanuel Kant", y: "1724–1804", t: "Freiheit & Authentizität" },
  { q: "Seid geduldig mit allem, aber vor allem mit euch selbst.",
    a: "Franz von Sales", y: "1567–1622", t: "Freiheit & Authentizität" },
  { q: "Der Mensch ist frei geboren und überall liegt er in Ketten.",
    a: "Jean-Jacques Rousseau", y: "1712–1778", t: "Freiheit & Authentizität" },

  // Mitgefühl & Liebe
  { q: "Selbst nach all dieser Zeit sagt die Sonne nie zur Erde: 'Du schuldest mir.' Schau, was eine solche Liebe vermag — sie erleuchtet die ganze Welt.",
    a: "Hafis", y: "1315–1390", t: "Mitgefühl & Liebe" },
  { q: "Herr, mach mich zu einem Werkzeug deines Friedens. Wo Hass ist, möge ich Liebe bringen.",
    a: "Franz von Assisi", y: "1181–1226", t: "Mitgefühl & Liebe" },
  { q: "Mein Herz ist fähig, jede Form anzunehmen — eine Weide für Gazellen und ein Kloster für christliche Mönche.",
    a: "Ibn Arabi", y: "1165–1240", t: "Mitgefühl & Liebe" },
  { q: "Die Liebe, die die Sonne bewegt und alle Sterne.",
    a: "Dante Alighieri", y: "1265–1321", t: "Mitgefühl & Liebe" },
  { q: "Das größte Glück des Lebens ist die Überzeugung, dass wir geliebt werden.",
    a: "Victor Hugo", y: "1802–1885", t: "Mitgefühl & Liebe" },
  { q: "Aufmerksamkeit ist die seltenste und reinste Form der Großzügigkeit.",
    a: "Simone Weil", y: "1909–1943", t: "Mitgefühl & Liebe" },
  { q: "Ein Mensch ohne Freude ist wie ein Baum ohne Blüten oder Früchte.",
    a: "Hildegard von Bingen", y: "1098–1179", t: "Mitgefühl & Liebe" },
  { q: "Das, was ich nicht will, dass man es mir antue, will ich auch nicht anderen antun.",
    a: "Konfuzius", y: "551–479 v. Chr.", t: "Mitgefühl & Liebe" },

  // Mut & Angst
  { q: "Du kannst das Meer nicht überqueren, wenn du Angst hast, das Ufer aus den Augen zu verlieren.",
    a: "Rabindranath Tagore", y: "1861–1941", t: "Mut & Angst" },
  { q: "Kein Vogel fliegt zu hoch, wenn er mit seinen eigenen Flügeln fliegt.",
    a: "William Blake", y: "1757–1827", t: "Mut & Angst" },
  { q: "Ehrfurcht vor dem Leben ist das erste und beständigste Prinzip der Ethik.",
    a: "Albert Schweitzer", y: "1875–1965", t: "Mut & Angst" },

  // Stille & Kontemplation
  { q: "Zwei Dinge erfüllen das Gemüt mit immer neuer Bewunderung: der bestirnte Himmel über mir und das moralische Gesetz in mir.",
    a: "Immanuel Kant", y: "1724–1804", t: "Stille & Kontemplation" },
  { q: "Wende dich nach innen: Alles, was du außen suchst, liegt in dir.",
    a: "Plotin", y: "204–270 n. Chr.", t: "Stille & Kontemplation" },
  { q: "Horche auf die Eingebungen eines gütigen Meisters und neige das Ohr deines Herzens.",
    a: "Benedikt von Nursia", y: "480–547 n. Chr.", t: "Stille & Kontemplation" },
  { q: "Der Schmetterling zählt nicht die Monate, sondern die Momente.",
    a: "Rabindranath Tagore", y: "1861–1941", t: "Stille & Kontemplation" },

  // Weisheit
  { q: "Der Mensch ist von Natur aus ein soziales Wesen.",
    a: "Aristoteles", y: "384–322 v. Chr.", t: "Weisheit" },
  { q: "Wir sind spirituelle Wesen, die eine menschliche Erfahrung machen.",
    a: "Pierre Teilhard de Chardin (zugeschrieben)", y: "1881–1955", t: "Weisheit" },
  { q: "Ich folgte der Liebe, wohin sie mich auch führte — Liebe ist meine Religion und mein Glaube.",
    a: "Ibn Arabi", y: "1165–1240", t: "Weisheit" },

  // Frieden & Gelassenheit
  { q: "Wir müssen unseren Garten bestellen.",
    a: "Voltaire", y: "1694–1778", t: "Frieden & Gelassenheit" },
  { q: "Das Ziel des Lebens ist die Glückseligkeit — sie liegt im Tätigsein gemäß der Tugend.",
    a: "Aristoteles", y: "384–322 v. Chr.", t: "Frieden & Gelassenheit" },

  { q: "Sage mir, mit wem du umgehst, und ich sage dir, wer du bist.",
    a: "Miguel de Cervantes (zugeschrieben)", y: "1547–1616", t: "Weisheit" },
  { q: "Man muss das Chaos in sich haben, um einen tanzenden Stern gebären zu können.",
    a: "Friedrich Nietzsche", y: "1844–1900", t: "Leidenschaft & Schatten" },
  { q: "Der Schmerz des Abschieds ist nichts gegen die Freude des Wiedersehens.",
    a: "Rabindranath Tagore", y: "1861–1941", t: "Mitgefühl & Liebe" },
  { q: "Gott ist näher bei mir als ich mir selbst.",
    a: "Meister Eckhart", y: "1260–1328", t: "Stille & Kontemplation" },

];

window._zitateData = zitateData;
