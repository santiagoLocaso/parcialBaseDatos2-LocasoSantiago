//1) Crear el script .js con la creación de la base de datos y las colecciones.

//use cafeteria;
db.cafesEspeciales.drop()
db.cafesEspeciales.insertMany([
    {
        tipo: "espresso",
        ingredientes: ["vainilla", "chocolate"],
        peso: 250,
        intensidad: "alta",
        precio:[
            {tipo: "efectivo", precio: 500},
            {tipo: "tarjeta", precio: 550}
        ],
        leche: false,
        tostador: {
            localidad: "Lomas de Zamora", nombre:"cafe lomas", cuit: "20-15325123-4"
        }
    },
    {
        tipo: "filtrado",
        ingredientes: ["caramelo", "chocolate"],
        peso: 200,
        intensidad: "media",
        precio:[
            {tipo: "efectivo", precio: 400},
            {tipo: "tarjeta", precio: 450}
        ],
        leche: true,
        tostador: {
            localidad: "Lomas de Zamora", nombre:"cafe retro", cuit: "20-55511122-4"
        }
    },
    {
        tipo: "cold brew",
        ingredientes: ["canela", "vainilla"],
        peso: 300,
        intensidad: "baja",
        precio:[
            {tipo: "efectivo", precio: 600},
            {tipo: "tarjeta", precio: 650}
        ],
        leche: false,
        tostador: {
            localidad: "Banfield", nombre:"cafe banfield", cuit: "20-22255566-4"
        }
    },
    {
        tipo: "descafeinado",
        ingredientes: ["canela", "chocolate"],
        peso: 250,
        intensidad: "alta",
        precio:[
            {tipo: "efectivo", precio: 500},
            {tipo: "tarjeta", precio: 600}
        ],
        leche: true,
        tostador: {
            localidad: "Lanus", nombre:"sur cafe", cuit: "20-66688899-4"
        }
    },
    {
        tipo: "espresso",
        ingredientes: ["caramelo", "chocolate"],
        peso: 300,
        intensidad: "media",
        precio:[
            {tipo: "efectivo", precio: 450},
            {tipo: "tarjeta", precio: 500}
        ],
        leche: false,
        tostador: {
            localidad: "San Isidro", nombre:"norte cafe", cuit: "20-4567891-4"
        }
    },
    {
        tipo: "descafeinado",
        ingredientes: ["vainilla", "canela"],
        peso: 150,
        intensidad: "baja",
        precio:[
            {tipo: "efectivo", precio: 200},
            {tipo: "tarjeta", precio: 250}
        ],
        leche: false,
        tostador: {
            localidad: "Temperley", nombre:"cafe futbol", cuit: "20-1234569-4"
        }
    },
    {
        tipo: "espresso",
        ingredientes: ["caramelo", "canela"],
        peso: 300,
        intensidad: "alta",
        precio:[
            {tipo: "efectivo", precio: 700},
            {tipo: "tarjeta", precio: 750}
        ],
        leche: true,
        tostador: {
            localidad: "Avellaneda", nombre:"cafe avellaneda", cuit: "20-3216549-4"
        }
    },
    {
        tipo: "cold brew",
        ingredientes: ["caramelo", "vainilla"],
        peso: 150,
        intensidad: "media",
        precio:[
            {tipo: "efectivo", precio: 300},
            {tipo: "tarjeta", precio: 350}
        ],
        leche: false,
        tostador: {
            localidad: "Palermo", nombre:"cafe palermo", cuit: "20-9876542-4"
        }
    },
    {
        tipo: "filtrado",
        ingredientes: ["vainilla", "canela"],
        peso: 250,
        intensidad: "baja",
        precio:[
            {tipo: "efectivo", precio: 550},
            {tipo: "tarjeta", precio: 600}
        ],
        leche: true,
        tostador: {
            localidad: "Belgrano", nombre:"cafe belgrano", cuit: "20-6549873-4"
        }
    },
    {
        tipo: "espresso",
        ingredientes: ["canela", "chocolate"],
        peso: 300,
        intensidad: "alta",
        precio:[
            {tipo: "efectivo", precio: 500},
            {tipo: "tarjeta", precio: 600}
        ],
        leche: false,
        tostador: {
            localidad: "Recoleta", nombre:"cafe recoleta", cuit: "20-3219875-4"
        }
    },
])

// 2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.
db.cafesEspeciales.aggregate([{$match: {ingredientes: "chocolate"}}, {$count: "cantidad con chocolate"}]);

// 3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.
db.cafesEspeciales.aggregate([{$match: {tipo: "cold brew", ingredientes: "vainilla"}}, {$count: "cantidad cold brew con vainilla"}]);

// 4) Listar tipo y peso de los cafés que tienen una intensidad “media”.
db.cafesEspeciales.find({intensidad: "media"}, {_id: 0, tipo: 1, peso: 1});

// 5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.
db.cafesEspeciales.find({peso: {$gte: 200, $lte: 260}}, {_id: 0, tipo: 1, peso: 1, intensidad: 1});

// 6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente.
db.cafesEspeciales.find({"tostador.localidad": {$regex: /san/i}}).sort({peso: -1});

// 7) Mostrar la sumar del peso de cada tipo de Café.
db.cafesEspeciales.aggregate([{$group: {_id: "$tipo", totalPeso: {$sum: "$peso"}}}]);

// 8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.
db.cafesEspeciales.updateMany({intensidad: "alta"}, {$push: {ingredientes: "whisky"}});

// 9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.
db.cafesEspeciales.updateMany({peso: {$gte: 200, $lte: 260}}, {$inc: {peso: 10}});

// 10) Eliminar los cafés cuyo peso sea menor o igual a 210.
db.cafesEspeciales.deleteMany({peso: {$lte: 210}});