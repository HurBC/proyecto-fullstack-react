const productsRepoConstructor = {
  getAllProducts: function () {
    return this.products;
  },
  getProductById: function (pCode) {
    return this.products.find((p) => p.code === pCode);
  },
  getFeaturedProducts: function () {
    return this.products.filter((p) => p.featured === true);
  },
  getAllCategories: function () {
    const categories = new Set();
    this.products.forEach((product) => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((cat) => categories.add(cat));
      }
    });
    return Array.from(categories);
  },
  getProductsByCategory: function (categoryName) {
    if (!categoryName) {
      console.warn(
        "Se llamó a 'getProductsByCategory' sin un nombre de categoría. Devolviendo todos los productos."
      );
      return this.products;
    }
    return this.products.filter(
      (product) =>
        product.categories &&
        Array.isArray(product.categories) &&
        product.categories.includes(categoryName)
    );
  },
};

let ProductsRepo = Object.create(productsRepoConstructor);

ProductsRepo.products = [
  {
    code: "INDIE001",
    categories: ["Indie", "Multijugador", "Estrategia"],
    name: "Among Us",
    price: 4990,
    description:
      "Un juego multijugador de deducción social donde los tripulantes intentan identificar a los impostores que sabotean la nave y asesinan a la tripulación. ¡No confíes en nadie!",
    stock: 100,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  {
    code: "ROGUELIKE001",
    categories: ["Roguelike", "Shooter", "Acción"],
    name: "Risk of Rain 2",
    price: 18990,
    description:
      "Un intenso shooter roguelike en tercera persona donde los jugadores luchan contra hordas de monstruos, desbloquean nuevos objetos y personajes, y se vuelven increíblemente poderosos.",
    stock: 75,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  {
    code: "RPG001",
    categories: ["RPG de Acción", "Mundo Abierto", "Fantasía"],
    name: "The Witcher 3: Wild Hunt",
    price: 24990,
    description:
      "Embárcate en una épica aventura de rol como Geralt de Rivia, un cazador de monstruos, mientras exploras un vasto mundo abierto, tomas decisiones morales difíciles y cazas a la Niña de la Profecía.",
    stock: 50,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  {
    code: "FPS001",
    categories: ["Shooter", "FPS", "Multijugador"],
    name: "Call of Duty: Modern Warfare III",
    price: 59990,
    description:
      "El último capítulo de la aclamada saga de shooters, ofreciendo una campaña cinematográfica, un multijugador competitivo y la experiencia de zombies más grande hasta la fecha.",
    stock: 40,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "ESTRATEGIA001",
    categories: ["Estrategia en Tiempo Real", "Construcción"],
    name: "Age of Empires IV",
    price: 39990,
    description:
      "Regresa la icónica serie de estrategia en tiempo real, permitiéndote liderar civilizaciones históricas a través de las eras, construir imperios y dominar el campo de batalla.",
    stock: 35,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "AVENTURA001",
    categories: ["Aventura", "Sandbox", "Construcción"],
    name: "Minecraft",
    price: 15990,
    description:
      "Un juego de sandbox donde puedes construir lo que quieras, explorar vastos mundos generados proceduralmente, y sobrevivir a noches llenas de monstruos.",
    stock: 90,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  {
    code: "FANTASIA001",
    categories: ["RPG de Fantasía", "Táctico", "Historia"],
    name: "Baldur's Gate 3",
    price: 69990,
    description:
      "Un épico juego de rol ambientado en el universo de Dungeons & Dragons, con decisiones profundas, combate táctico por turnos y una narrativa inmersiva.",
    stock: 30,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  {
    code: "PLATAFORMAS001",
    categories: ["Plataformas", "Aventura", "Metroidvania"],
    name: "Hollow Knight",
    price: 12990,
    description:
      "Un aclamado metroidvania con un estilo artístico cautivador, combate desafiante y un mundo profundo lleno de secretos para explorar.",
    stock: 60,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "SIMULACION001",
    categories: ["Simulación", "RPG", "Farming"],
    name: "Stardew Valley",
    price: 9990,
    description:
      "Escapa del ajetreo de la ciudad para empezar una nueva vida en la granja de tu abuelo. Cultiva, cría animales, pesca y explora cuevas mientras te integras en la comunidad.",
    stock: 80,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "TERROR001",
    categories: ["Survival Horror", "Acción"],
    name: "Resident Evil 4 Remake",
    price: 49990,
    description:
      "Experimenta el clásico de terror de supervivencia con gráficos modernizados, jugabilidad reinventada y una atmósfera aún más aterradora.",
    stock: 25,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "LUCHA001",
    categories: ["Lucha", "Acción"],
    name: "Mortal Kombat 1",
    price: 54990,
    description:
      "El último título de la brutal saga de lucha, con un universo reimaginado, nuevos Fatalities y Kameos para una experiencia de combate visceral.",
    stock: 30,
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "CARRERAS001",
    categories: ["Carreras", "Mundo Abierto", "Simulación"],
    name: "Forza Horizon 5",
    price: 49990,
    description:
      "Explora un vibrante mundo abierto de México con cientos de los mejores autos del mundo y disfruta de una libertad de conducción ilimitada.",
    stock: 38,
    image: "/public/img/catan.jpg",
    featured: true,
  },
  // Nuevas categorías añadidas para demostrar la funcionalidad
  {
    code: "FPS002",
    categories: ["FPS", "Sci-Fi", "Acción", "Estrategia"],
    name: "Destiny 2",
    price: 0, // Free to Play base game
    description:
      "Un shooter de acción MMO con un mundo en constante evolución y combates intensos PvE y PvP.",
    stock: 999, // Asumo que es digital y siempre disponible
    image: "/public/img/catan.jpg",
    featured: false,
  },
  {
    code: "RPG002",
    categories: ["RPG de Acción", "Fantasía", "Cooperativo"],
    name: "Diablo IV",
    price: 69990,
    description:
      "El aclamado RPG de acción donde luchas contra las fuerzas del mal en el oscuro mundo de Santuario.",
    stock: 60,
    image: "/public/img/catan.jpg",
    featured: true,
  },
];

export default ProductsRepo;
