Tema

#Administración de un Club Náutico
Descripción

Sistema web con usuarios diferenciados: socios y administradores.
Permite a los socios consultar su situación administrativa, reservar servicios y ver disponibilidad de infraestructura.
Los administradores pueden gestionar socios, embarcaciones, cuotas, reservas, boxes y amarres, así como también consultar reportes de ocupación y deuda.
Modelo

📌 Link al modelo de dominio / DER / diagrama de clases: [Link a imagen o diagrama]
(o usar diagrama Mermaid directamente en el README del repo si se prefiere)
Alcance Funcional
Alcance Mínimo

CRUD Simple (4):

    Socio – Alta, baja, modificación y consulta de socios.

    Box – Gestión de boxes en tierra (ubicación, estado).

    Amarra – Gestión de amarres en el agua (ubicación, estado).

    BotesClub - Gestión de prestación de botes del club(estado, cantidad, tipo).

CRUD Dependiente (2):

    CuotaMensual – Gestión de las cuotas mensuales generadas y pagadas por los socios.
    
    Embarcación (depende de Socio, y puede estar asociada a una Amarra o Box).

    //ReservaTravelLift (depende de Socio y de una Embarcación).

Listados con filtro + detalle (2):

    Listado de cuotas impagas

        Filtro: por mes o tipo de cuota. O por socio

        Detalle: nombre del socio, monto, vencimiento, estado

    Listado de boxes filtrado por zona y estado
        Detalle: Zona, ID, estado

    //Listado de reservas del travel lift

        //Filtro: por fecha

        //Detalle: socio, embarcación, fecha y hora, observaciones

CUU / Epic (2):

    //El socio reserva el travel lift para una embarcación.

    El administrador registra el pago de una cuota y consulta la deuda total del socio.

    LA embarción cambia a una nueva Amarra

    

Alcance Adicional Voluntario (Opcional)

Listados:

    Reporte de ocupación de amarres y boxes

    Reporte de morosidad, con socios que deben más de X cuotas

CUU / Epic:

    Suspensión automática de socios con más de 3 cuotas impagas

    Envío automático de recordatorios de pago

Otros:

    Vista gráfica o visual de los amarres y boxes, con estado de ocupación (color verde/rojo/gris, por ejemplo)

    //Observaciones en la reserva del travel lift (motivo, duración estimada, etc.)
