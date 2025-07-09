// CREACION

// CREACION DE ESTUDIANTES
CREATE (E1:ESTUDIANTE {Nombre: 'Paco', Apellido: 'Fontana'});
CREATE (E2:ESTUDIANTE {Nombre: 'Nacho', Apellido: 'Alvarado'});
CREATE (E3:ESTUDIANTE {Nombre: 'Ivo', Apellido: 'Ansorena'});

// CREACION DE CARRERAS
CREATE (C1:CARRERA {Nombre: 'Tecnicatura Universitraria en Programación'});
CREATE (C2:CARRERA {Nombre: 'Licenciatura en Sistemas de Información'});
CREATE (C3:CARRERA {Nombre: 'Ingeniería en Sistemas de Información'});

// CREACION DE LIBROS

CREATE (L1:LIBRO {Titulo: 'Introducción a la Programación', Autor: 'John Doe'});
CREATE (L2:LIBRO {Titulo: 'Bases de Datos Avanzadas', Autor: 'Jane Smith'});
CREATE (L3:LIBRO {Titulo: 'Sistemas Operativos Modernos', Autor: 'Andrew S. Tanenbaum'});
CREATE (L4:LIBRO {Titulo: 'Algoritmos y Estructuras de Datos', Autor: 'Robert Sedgewick'});

//CREACION DE CATEGORIAS
CREATE (Cat1:CATEGORIA {Nombre: 'Programación'});
CREATE (Cat2:CATEGORIA {Nombre: 'Bases de Datos'});
CREATE (Cat3:CATEGORIA {Nombre: 'Sistemas Operativos'});
CREATE (Cat4:CATEGORIA {Nombre: 'Algoritmos'});

// CREACION DE RELACIONES ENTRE ESTUDIANTES Y CARRERAS
CREATE (E1)-[:ESTUDIA]->(C1);
CREATE (E2)-[:ESTUDIA]->(C2);
CREATE (E3)-[:ESTUDIA]->(C3);

// CREACION DE RELACIONES ENTRE CATEGORIAS Y LIBROS

CREATE (Cat1)-[:TIENE_LIBRO]->(L1);
CREATE (Cat2)-[:TIENE_LIBRO]->(L2);
CREATE (Cat3)-[:TIENE_LIBRO]->(L3);
CREATE (Cat4)-[:TIENE_LIBRO]->(L4);

// CREACION DE RELACIONES ENTRE ESTUDIANTES Y LIBROS (prestamos)
CREATE (E1)-[:PRESTADO {Fecha: '2025-7-06', Estado: 'Activo'}]->(L1);
CREATE (E2)-[:PRESTADO {Fecha: '2025-7-06', Estado: 'Activo'}]->(L2);
CREATE (E3)-[:PRESTADO {Fecha: '2025-7-07', Estado: 'Devuelto'}]->(L3);
CREATE (E1)-[:PRESTADO {Fecha: '2025-7-07', Estado: 'Activo'}]->(L4);
CREATE (E2)-[:PRESTADO {Fecha: '2025-7-08', Estado: 'Devuelto'}]->(L1);


// CONSULTAS
//Obtener todos los libros actualmente prestados (estado "Activo" ).
MATCH (e:ESTUDIANTE)-[p:PRESTADO {Estado: 'Activo'}]->(l:LIBRO)
RETURN e.Nombre AS Estudiante, e.Apellido AS Apellido, l.Titulo AS Libro
ORDER BY e.Nombre;


// Listar cuántos libros ha pedido prestado cada estudiante.
MATCH (e:ESTUDIANTE)-[:PRESTADO]->(l:LIBRO)
RETURN e.Nombre AS Estudiante, e.Apellido AS Apellido, count(l) AS Libros_Pedidos
ORDER BY e.Nombre;

//Mostrar las categorías con más préstamos activos
MATCH (c:CATEGORIA)<-[:TIENE_LIBRO]-(l:LIBRO)<-[:PRESTADO {Estado: 'Activo'}]-(e:ESTUDIANTE)
RETURN c.Nombre AS Categoria, count(l) AS Libros_Activos
ORDER BY count(l) DESC;

//Encontrar los estudiantes que no tienen préstamos activos.
MATCH (e:ESTUDIANTE)
WHERE NOT (e)-[:PRESTADO {Estado: 'Activo'}]->(:LIBRO)
RETURN e.Nombre AS Estudiante, e.Apellido AS Apellido
ORDER BY e.Nombre;