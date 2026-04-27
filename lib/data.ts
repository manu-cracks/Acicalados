// Datos estáticos de fallback — se sobreescriben con Supabase en el servidor
import type { Service, Product, Testimonial, FAQ, BlogPost, GalleryItem, VestuarioItem } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'barberia',
    rubro: 'BARBERÍA',
    name: 'Barbería',
    tagline: 'Cortes, afeitado y barbería tradicional',
    accent: '#B8823A',
    description: 'El oficio de la navaja y la tijera. Cortes clásicos, fade contemporáneo, afeitado al ras con toalla caliente y un ritual que respeta cada detalle.',
    items: [
      { id: 'b1', name: 'Corte Clásico', duration: '45 min', price: 45, desc: 'Corte a máquina y tijera con acabado a navaja.' },
      { id: 'b2', name: 'Corte Ejecutivo', duration: '60 min', price: 65, desc: 'Consulta personal, corte, lavado y styling premium.' },
      { id: 'b3', name: 'Afeitado Ritual', duration: '45 min', price: 55, desc: 'Toalla caliente, aceite pre-afeitado, navaja y bálsamo.' },
      { id: 'b4', name: 'Diseño de Barba', duration: '30 min', price: 35, desc: 'Perfilado, recorte y acabado con aceites nutritivos.' },
      { id: 'b5', name: 'Corte + Barba', duration: '75 min', price: 85, desc: 'El ritual completo. Ahorro frente a servicios por separado.' },
      { id: 'b6', name: 'Coloración de Cabello', duration: '90 min', price: 120, desc: 'Tinte o cobertura de canas con productos profesionales.' },
    ]
  },
  {
    id: 'spa',
    rubro: 'SPA',
    name: 'SPA para Caballeros',
    tagline: 'Tratamientos de relajación y cuidado',
    accent: '#C9A36A',
    description: 'Un espacio para desacelerar. Tratamientos faciales, masajes descontracturantes y rituales de cuidado pensados para el hombre contemporáneo.',
    items: [
      { id: 's1', name: 'Facial Profundo', duration: '60 min', price: 110, desc: 'Limpieza, extracción, mascarilla e hidratación.' },
      { id: 's2', name: 'Masaje Descontracturante', duration: '60 min', price: 130, desc: 'Tensión muscular, cuello, espalda y hombros.' },
      { id: 's3', name: 'Ritual Caballero', duration: '120 min', price: 260, desc: 'Facial + masaje + afeitado ritual. La experiencia completa.' },
      { id: 's4', name: 'Manicure Masculino', duration: '45 min', price: 55, desc: 'Limado, cutículas y pulido natural.' },
      { id: 's5', name: 'Pedicure Spa', duration: '60 min', price: 75, desc: 'Exfoliación, hidratación y acabado impecable.' },
      { id: 's6', name: 'Sauna + Ducha Escocesa', duration: '45 min', price: 60, desc: 'Complemento perfecto antes de cualquier tratamiento.' },
    ]
  },
  {
    id: 'vestuario',
    rubro: 'VESTUARIO',
    name: 'Alquiler de Vestuario',
    tagline: 'Trajes, smokings y vestuario formal a medida',
    accent: '#A96B3A',
    description: 'Para el evento que no admite errores. Trajes de novio, smokings y piezas formales con ajuste profesional y acompañamiento personalizado.',
    items: [
      { id: 'v1', name: 'Traje de Novio', duration: 'Atención con cita', price: null, desc: 'Ajuste personalizado. Precio bajo consulta con recepción.' },
      { id: 'v2', name: 'Smoking Clásico', duration: 'Atención con cita', price: null, desc: 'Corbata de lazo, faja y camisa incluidas.' },
      { id: 'v3', name: 'Frac / Protocolo', duration: 'Atención con cita', price: null, desc: 'Vestimenta de gala para eventos protocolares.' },
      { id: 'v4', name: 'Traje Ejecutivo', duration: 'Atención con cita', price: null, desc: 'Cortes modernos para eventos corporativos.' },
      { id: 'v5', name: 'Chaqué', duration: 'Atención con cita', price: null, desc: 'Elegancia matinal para bodas y eventos formales.' },
      { id: 'v6', name: 'Accesorios premium', duration: 'Con alquiler', price: null, desc: 'Corbatas, gemelos, fajas, zapatos y pañuelos.' },
    ]
  },
]

export const PRODUCTS: Product[] = [
  { id: 'p1', cat: 'Barba', name: 'Aceite de Barba · Cedro & Vetiver', price: 85, stock: 12, desc: 'Mezcla artesanal con aceite de argán, jojoba y esencias tabacosas.' },
  { id: 'p2', cat: 'Barba', name: 'Bálsamo Moldeador', price: 65, stock: 8, desc: 'Fijación media con acabado natural y nutrición prolongada.' },
  { id: 'p3', cat: 'Cabello', name: 'Pomada Mate de Arcilla', price: 70, stock: 20, desc: 'Fijación fuerte, sin brillo. Ideal para cabello grueso.' },
  { id: 'p4', cat: 'Cabello', name: 'Shampoo Fortificante', price: 90, stock: 15, desc: 'Fórmula con cafeína y biotina. Sulfate-free.' },
  { id: 'p5', cat: 'Afeitado', name: 'Crema de Afeitado Tradicional', price: 78, stock: 9, desc: 'Jabón de afeitar en crema. Espuma densa, sin irritación.' },
  { id: 'p6', cat: 'Afeitado', name: 'After-Shave de Sándalo', price: 95, stock: 6, desc: 'Refresca e hidrata. Aroma amaderado con notas cálidas.' },
  { id: 'p7', cat: 'Facial', name: 'Sérum Regenerador Nocturno', price: 160, stock: 4, desc: 'Retinol, ácido hialurónico y vitamina C.' },
  { id: 'p8', cat: 'Facial', name: 'Crema Hidratante Masculina', price: 120, stock: 11, desc: 'Textura ligera, absorción rápida, protección SPF 30.' },
  { id: 'p9', cat: 'Herramientas', name: 'Brocha de Afeitado · Pelo de Tejón', price: 220, stock: 3, desc: 'Mango de madera torneada a mano. Pieza de colección.' },
  { id: 'p10', cat: 'Herramientas', name: 'Navaja Barbera', price: 340, stock: 2, desc: 'Acero japonés. Filo profesional. Incluye estuche.' },
  { id: 'p11', cat: 'Set', name: 'Kit Barba Completo', price: 240, stock: 5, desc: 'Aceite + bálsamo + peine + estuche de cuero.' },
  { id: 'p12', cat: 'Set', name: 'Ritual Caballero · Caja Regalo', price: 420, stock: 3, desc: 'Cuatro productos curados en caja de madera grabada.' },
]

export const VESTUARIO_ITEMS: VestuarioItem[] = [
  { id: 'v1', name: 'Traje de Novio · Onyx', category: 'Novio', status: 'Disponible', desc: 'Lana inglesa, corte slim, solapa pico.', deposit: 300 },
  { id: 'v2', name: 'Smoking · Midnight Blue', category: 'Smoking', status: 'Disponible', desc: 'Azul medianoche con solapa de seda.', deposit: 300 },
  { id: 'v3', name: 'Frac · Gala Blanca', category: 'Gala', status: 'Reservado', desc: 'Frac protocolar con camisa plisada.', deposit: 300 },
  { id: 'v4', name: 'Traje Ejecutivo · Charcoal', category: 'Ejecutivo', status: 'Disponible', desc: 'Gris carbón, dos botones, acabado mate.', deposit: 300 },
  { id: 'v5', name: 'Chaqué · Bodas de mañana', category: 'Chaqué', status: 'En mantenimiento', desc: 'Chaqué gris con chaleco de fantasía.', deposit: 300 },
  { id: 'v6', name: 'Smoking · Terciopelo Borgoña', category: 'Smoking', status: 'Disponible', desc: 'Pieza exclusiva de eventos de gala.', deposit: 300 },
  { id: 'v7', name: 'Traje de Novio · Crema', category: 'Novio', status: 'Disponible', desc: 'Bodas de playa y destinos cálidos.', deposit: 300 },
  { id: 'v8', name: 'Esmoquin Cruzado · Obsidiana', category: 'Smoking', status: 'En uso', desc: 'Doble abotonadura con solapa a contraste.', deposit: 300 },
]

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Mateo Reátegui', role: 'Cliente desde 2023', quote: 'No es un corte, es un ritual. Salgo renovado cada vez. El trato es impecable y los detalles, todos cuentan.' },
  { name: 'Andrés Villacorta', role: 'Abogado · San Isidro', quote: 'Alquilé aquí mi traje de novio. Atención personalizada, ajuste perfecto y un acompañamiento que agradecí todo el día.' },
  { name: 'Joaquín Prado', role: 'Cliente SPA', quote: 'El ritual caballero de dos horas es la mejor inversión mensual que hago. Es silencio, aroma y manos expertas.' },
  { name: 'Fernando Castro', role: 'Empresario', quote: 'Mi barbería de confianza hace cuatro años. Jamás me han fallado en puntualidad ni en calidad.' },
]

export const FAQS: FAQ[] = [
  { q: '¿Necesito reservar con anticipación?', a: 'Recomendamos reservar con mínimo 24 horas de anticipación. Para servicios de Vestuario, la cita debe solicitarse con al menos 72 horas de antelación para garantizar la atención personalizada.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Tarjetas de crédito y débito, transferencias bancarias (BCP, BBVA, Interbank), Yape y efectivo en nuestra sede. Las reservas en línea requieren un adelanto mínimo del 30%.' },
  { q: '¿Puedo cancelar o modificar mi reserva?', a: 'Sí. Puedes cancelar o reprogramar con un mínimo de 2 horas de anticipación sin costo. Fuera de ese rango, el adelanto no es reembolsable.' },
  { q: '¿Por qué el vestuario no tiene precios en el catálogo?', a: 'Cada alquiler se personaliza según modelo, accesorios, fechas y ajustes requeridos. Nuestra recepcionista coordina contigo el precio final tras la selección y toma de medidas.' },
  { q: '¿Qué documentos se requieren para alquilar vestuario?', a: 'DNI original (ambas caras), selfie sosteniendo el DNI, teléfono, correo y dirección. Se solicita un depósito de garantía que se devuelve al retornar la pieza en buen estado.' },
  { q: '¿Hacen delivery de productos?', a: 'Sí, despachamos productos de tienda a todo Lima Metropolitana. El costo y tiempo varían según distrito. Recepción coordina directamente contigo.' },
]

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, cat: 'Ritual', title: 'El arte del afeitado con navaja', excerpt: 'Por qué la tradición sobrevive: una meditación sobre técnica, tiempo y temperatura.', date: '14 Abr 2026', read: '6 min' },
  { id: 2, cat: 'Cuidado', title: 'Guía esencial del cuidado de barba', excerpt: 'De aceites a cepillos: los fundamentos para una barba densa, sana y bien llevada.', date: '02 Abr 2026', read: '8 min' },
  { id: 3, cat: 'Estilo', title: 'Cómo elegir tu traje de novio', excerpt: 'Colores, cortes, telas y los detalles que marcan la diferencia el día más importante.', date: '28 Mar 2026', read: '10 min' },
  { id: 4, cat: 'SPA', title: 'El cuidado facial masculino, explicado', excerpt: 'Rutina en tres pasos, tipos de piel y cuándo acudir a tratamientos profesionales.', date: '18 Mar 2026', read: '7 min' },
]

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, span: 'wide', label: 'Barbería · Interior principal' },
  { id: 2, span: 'tall', label: 'Barbero · Corte a navaja' },
  { id: 3, span: '', label: 'Detalle · Herramientas' },
  { id: 4, span: '', label: 'Vestuario · Showroom' },
  { id: 5, span: 'wide', label: 'SPA · Sala de tratamiento' },
  { id: 6, span: '', label: 'Producto · Aceites' },
  { id: 7, span: 'tall', label: 'Cliente · Antes / Después' },
  { id: 8, span: '', label: 'Detalle · Brocha de tejón' },
  { id: 9, span: '', label: 'Fachada · Noche' },
]

export const NAV_ITEMS = [
  { id: 'home', label: 'Inicio', href: '/' },
  { id: 'barberia', label: 'Barbería', href: '/barberia' },
  { id: 'spa', label: 'Spa', href: '/spa' },
  { id: 'vestuario', label: 'Vestuario', href: '/vestuario' },
  { id: 'productos', label: 'Productos', href: '/productos' },
  { id: 'contact', label: 'Contacto', href: '/contacto' },
]
