
# Propuesta TP DSW

## Grupo
### Integrantes
* 51474 - Galasco Alexis
* 48833 - Soler Leandro
* 53120 - Foronda Juan Manuel
* 52441 - Agustin Rivero

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)

## Administración de un Club Náutico
### Descripción
*Sistema web con usuarios diferenciados: socios y administradores.
Permite a los socios consultar su situación administrativa, reservar servicios y ver disponibilidad de infraestructura.
Los administradores pueden gestionar socios, embarcaciones, cuotas, reservas, boxes y amarres, así como también consultar reportes de ocupación y deuda.
Modelo)*

### Modelo
![imagen](https://github.com/user-attachments/assets/aef83463-fec4-496b-bbe2-2c7dad5ea02f)



## Alcance Funcional 

### Alcance Mínimo
 
Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Socio<br>2. CRUD Box<br>3. CRUD Amarra<br>4. CRUD TipoEmbarcacion|
|CRUD dependiente|1. CRUD Afiliacion {depende de} CRUD Tipo Socio<br>2. CRUD Embarcacion {depende de} CRUD Socio y CRUD TipoEmbarcacion|
|Listado<br>+<br>detalle| 1. Listado de cuotas impagas filtrado por socio => detalle nombre del socio, mes, monto<br> 2. Listado de boxes y amarras filtrado por zona y estado => detalle muestra datos del box|
|CUU/Epic|1. El administrador genera y registra el pago de una cuota.<br>2. Socio reserva un bote del club|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Socio<br>2. CRUD Box<br>3. CRUD Amarra<br>5. CRUD ReservaTravelLift|
|CUU/Epic|1.La embarción cambia a una nueva Amarra.<br>3. El socio reserva el travel lift para una embarcación.|


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req|Detalle|
|:-|:-|
|Listados |1. Reporte de morosidad, con socios que deben más de X cuotas<br>|
|CUU/Epic|1. Implementar lista de espera de amarra<br>2.Vista gráfica o visual de los amarres y boxes, con estado de ocupación (color verde/rojo/gris, por ejemplo)|
|Otros|1. Envío automático de recordatorios de pago|
