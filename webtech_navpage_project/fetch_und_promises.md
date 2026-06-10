# fetch() und Promises

Wir haben schon gsehn wie die index.html, img files, css oder andere files mit **http GET requests** vom Server geholt werden.
Mit **fetch()** kann man so eine **request manuell im Code anfragen**. Damit holen wir uns des json File.
Des File liegt auf dem Server im gleichen Ordner wie des index.html.

Die Request kann aber dauern, wodurch des Skript an der Stelle anhalten würd und die Website potentiel unresponive wird.
Deswegen returned fetch() eine **Promise<Response>** statt der Response direkt, wodurch sie **asynchron** wird.
Eine Promise ist, wie der Name sagt ein **Versprechen an den JavaScript Compiler/Interpreter**, dass des Objekt in Zukunft mal eine Response sein wird.

In dem Fall wollen wir des aber garned, sondern wir wollen erst weitermachen, wenn wir des json auch eingelesen haben, weil sonst die json variable noch keinen Wert hat.
Deswegen müssen wir mit dem 'await' die Promise **resolven**, sprich das Script wartet an der Stelle, bis die http request fertig ist.
