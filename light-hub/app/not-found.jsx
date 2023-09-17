import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-5xl grid place-items-center h-screen">
      <h2>Ruta no encontrada</h2>
      <p>Lo siento no existe el recurso</p>
      <Link href="/">Regresar a Principal</Link>
    </div>
  );
}
