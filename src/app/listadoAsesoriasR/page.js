import MentorWebIco from "./../MentorWebIco.png";
import reservasData from '../listadoAsesoriasR/reservas.json';

export const metadata = {
  title: "MentorWeb",
  description: "Generated by create next app",
};

export default function Reservas() {
  return (

      <html lang="en">
        <body className="bg-customPink">
          <div className="flex h-screen">
            <div className="w-48 bg-gray-200 p-4">
              <h2>Menú</h2>
              <ul>
                <li style={{ marginTop: '10px' }}>Overview</li>
                <li style={{ marginTop: '10px' }}>Asesores</li>
              </ul>
              {/* Este div expande el menú lateral hasta abajo de la página */}
              <div className="flex-grow"></div>
            </div>
            <div className="flex-1 p-4">
              <div className="container" style={{ padding: '20px' }}>
                <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Listado de asesorias reservados por el usuario</h2>
                <ul className="reservas-list" style={{ listStyle: 'none', padding: 0 }}>
                  {reservasData.map((reserva) => (
                    <li key={reserva.id} className="reserva-item" style={{ marginBottom: '20px', textAlign: 'center' }}>
                      <div className="card" style={{ width: '70%', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                        <div className="cardContent" style={{ padding: '20px' }}>
                          <p className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Asesor: {reserva.asesor}</p>
                          <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Día: {reserva.dia}</p>
                          <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Hora: {reserva.hora}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </body>
      </html>
  );
}
