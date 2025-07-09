// CREACIONES
// CREACION DE DEPARTAMENTOS
CREATE (D1:DEPARTAMENTO {Nombre: 'Administración'});
CREATE (D2:DEPARTAMENTO {Nombre: 'Contabilidad'});
CREATE (D3:DEPARTAMENTO {Nombre: 'Recursos Humanos'});
CREATE (D4:DEPARTAMENTO {Nombre: 'Producción'});

// CREACION DE EMPLEADOS
CREATE (E1:EMPLEADO {Nombre: 'Paco', Apellido: 'Fontana'});
CREATE (E2:EMPLEADO {Nombre: 'Nacho', Apellido: 'Alvarado'});
CREATE (E3:EMPLEADO {Nombre: 'Ezequiel', Apellido: 'Wis'});
CREATE (E4:EMPLEADO {Nombre: 'Ivo', Apellido: 'Ansorena'});

// CREACION DE PROYECTOS
CREATE (P1:PROYECTO {Nombre: 'Practico 4'});
CREATE (P2:PROYECTO {Nombre: 'Proyecto Final'});

// CREACION DE RELACIONES ENTRE EMPLEADOS Y DEPARTAMENTOS

CREATE (E1)-[:PERTENECE]->(D1);
CREATE (E2)-[:PERTENECE]->(D2);
CREATE (E3)-[:PERTENECE]->(D3);
CREATE (E4)-[:PERTENECE]->(D4);

// CREACION DE RELACIONES ENTRE EMPLEADOS Y PROYECTOS

CREATE (E1)-[:TRABAJA_EN {Horas_Semanales: 15}]->(P1);
CREATE (E2)-[:TRABAJA_EN {Horas_Semanales: 20}]->(P1);
CREATE (E3)-[:TRABAJA_EN {Horas_Semanales: 25}]->(P2);
CREATE (E4)-[:TRABAJA_EN {Horas_Semanales: 30}]->(P2);

//CREACION DE LIDERES
CREATE (E1)-[:LIDERA]->(P1);
CREATE (E3)-[:LIDERA]->(P2);

// CONSULTAS

//Obtener el nombre del proyecto, su líder y los empleados asignados
MATCH (lider:EMPLEADO)-[:LIDERA]->(p:PROYECTO)
OPTIONAL MATCH (emp:EMPLEADO)-[:TRABAJA_EN]->(p)
RETURN p.Nombre AS Proyecto, lider.Nombre + ' ' + lider.Apellido AS Lider,
collect(emp.Nombre + ' ' + emp.Apellido) AS Empleados_Asignados
ORDER BY p.Nombre;


//Calcular el total de horas semanales por proyecto
MATCH (e:EMPLEADO)-[r:TRABAJA_EN]->(p:PROYECTO)
RETURN p.Nombre AS Proyecto, sum(r.Horas_Semanales) AS Total_Horas_Semanales
ORDER BY p.Nombre;

//Obtener los empleados que pertenecen a un departamento específico
MATCH (e:EMPLEADO)-[:PERTENECE]->(d:DEPARTAMENTO {Nombre: 'Producción'})
RETURN e.Nombre AS Empleado, e.Apellido AS Apellido
ORDER BY e.Nombre;
