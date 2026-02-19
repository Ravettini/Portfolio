import { Container } from '@/components/ui/container';

export function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 py-8">
      <Container>
        <p className="text-center text-xs font-light tracking-tight text-white/50">
          Ignacio Ravettini Novellino. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
