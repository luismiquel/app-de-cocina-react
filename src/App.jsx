import React, { useState, useEffect } from 'react';

// Componente principal de la aplicación.
const App = () => {
  // Estado para controlar la receta que se está viendo y el paso actual.
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Aperitivos");

  // Array de objetos con los datos de las recetas.
  // Ahora contiene más de 40 recetas tradicionales españolas.
  const recipes = [
    // --- APERITIVOS ---
    {
      titulo: "Patatas bravas",
      categoria: "Aperitivos",
      ingredientes: ["Patatas", "Aceite de oliva", "Mayonesa", "Tomate frito", "Pimentón picante"],
      pasos: [
        "Para comenzar, pela las patatas y córtalas en cubos. Lávalas bien para quitarles el almidón y sécalas con papel de cocina.",
        "Añade abundante aceite de oliva en una sartén. Cuando el aceite esté caliente, pero no humeante, incorpora las patatas. Fríelas a fuego medio-bajo durante unos 15 minutos, hasta que estén blandas por dentro.",
        "Sube el fuego a medio-alto para que las patatas se doren por fuera y queden crujientes. Retíralas del fuego y ponlas en un plato con papel absorbente para eliminar el exceso de aceite.",
        "Para la salsa brava, mezcla el tomate frito con un poco de pimentón picante. Para la salsa de mayonesa, puedes usar una mayonesa ya preparada.",
        "Sirve las patatas en un plato, báñalas con las salsas y decora con un poco de perejil picado. ¡A disfrutar!"
      ]
    },
    {
      titulo: "Croquetas de jamón",
      categoria: "Aperitivos",
      ingredientes: ["Harina de trigo", "Mantequilla", "Leche", "Jamón serrano", "Nuez moscada", "Huevo", "Pan rallado", "Aceite para freír"],
      pasos: [
        "Prepara una bechamel densa con mantequilla, harina y leche. Añade el jamón picado y la nuez moscada.",
        "Deja enfriar la masa en la nevera. Forma las croquetas, pásalas por huevo y pan rallado.",
        "Fríe en aceite caliente hasta que estén doradas. Sirve."
      ]
    },
    {
      titulo: "Gambas al ajillo",
      categoria: "Aperitivos",
      ingredientes: ["Gambas", "Aceite de oliva", "Ajo", "Guindilla", "Perejil"],
      pasos: [
        "Dora los ajos laminados y la guindilla en una cazuela de barro con aceite.",
        "Añade las gambas y cocina un par de minutos. Espolvorea con perejil y sirve burbujeando."
      ]
    },
    {
      titulo: "Tabla de embutidos y quesos",
      categoria: "Aperitivos",
      ingredientes: ["Jamón ibérico", "Lomo", "Chorizo", "Salchichón", "Queso curado", "Queso de cabra"],
      pasos: [
        "El único paso es cortar en lonchas finas los embutidos y los quesos. Sirve con pan y picos."
      ]
    },
    {
      titulo: "Pulpo a la gallega",
      categoria: "Aperitivos",
      ingredientes: ["Pulpo cocido", "Patatas", "Pimentón dulce", "Pimentón picante", "Sal gorda", "Aceite de oliva"],
      pasos: [
        "Corta el pulpo y cuece las patatas. Corta las patatas en rodajas y colócalas en un plato.",
        "Encima, pon el pulpo. Espolvorea pimentón y sal gorda. Rocía con aceite de oliva."
      ]
    },
    {
      titulo: "Pimientos de Padrón",
      categoria: "Aperitivos",
      ingredientes: ["Pimientos de Padrón", "Aceite de oliva", "Sal gorda"],
      pasos: [
        "Fríe los pimientos en abundante aceite de oliva caliente. Sácalos con una espumadera.",
        "Escúrrelos y espolvorea con sal gorda. Sirve inmediatamente."
      ]
    },
    {
      titulo: "Berenjenas con miel",
      categoria: "Aperitivos",
      ingredientes: ["Berenjenas", "Harina de trigo", "Miel de caña", "Aceite para freír"],
      pasos: [
        "Corta las berenjenas en rodajas, déjalas en remojo con agua y sal. Sécalas y pásalas por harina.",
        "Fríelas en aceite caliente hasta que estén doradas. Escúrrelas y rocía con miel de caña."
      ]
    },
    {
      titulo: "Champiñones al ajillo",
      categoria: "Aperitivos",
      ingredientes: ["Champiñones", "Ajo", "Perejil", "Vino blanco", "Aceite de oliva"],
      pasos: [
        "Lava y corta los champiñones. Sofríe los ajos en una sartén con aceite. Añade los champiñones.",
        "Cuando suelten el agua, añade el vino y el perejil. Cocina hasta que se evapore el alcohol."
      ]
    },
    {
      titulo: "Almejas a la marinera",
      categoria: "Aperitivos",
      ingredientes: ["Almejas", "Cebolla", "Ajo", "Vino blanco", "Harina", "Caldo de pescado", "Perejil"],
      pasos: [
        "Sofríe la cebolla y el ajo. Añade la harina y el vino. Incorpora el caldo y las almejas.",
        "Tapa y cocina hasta que las almejas se abran. Espolvorea perejil y sirve."
      ]
    },
    {
      titulo: "Calamares a la romana",
      categoria: "Aperitivos",
      ingredientes: ["Calamares", "Harina", "Huevo", "Aceite para freír", "Sal"],
      pasos: [
        "Limpia y corta los calamares en anillas. Sécalos, pásalos por harina y huevo batido.",
        "Fríelos en aceite muy caliente hasta que estén dorados. Sírvelos con limón."
      ]
    },
    // --- PRIMEROS ---
    {
      titulo: "Gazpacho andaluz",
      categoria: "Primeros",
      ingredientes: ["Tomates maduros", "Pepino", "Pimiento verde", "Cebolla", "Ajo", "Pan duro", "Aceite de oliva", "Vinagre", "Sal"],
      pasos: [
        "Pica las verduras y ponlas en un recipiente. Añade el pan duro remojado, aceite, vinagre y sal.",
        "Tritura todo con una batidora hasta que quede una mezcla fina. Pásala por un colador.",
        "Rectifica de sal y vinagre. Sirve frío, acompañado de picatostes o verduras picadas."
      ]
    },
    {
      titulo: "Salmorejo cordobés",
      categoria: "Primeros",
      ingredientes: ["Tomates maduros", "Pan de telera", "Ajo", "Aceite de oliva virgen extra", "Sal", "Jamón serrano", "Huevo duro"],
      pasos: [
        "Tritura los tomates con el pan, el ajo y la sal. Añade poco a poco el aceite y emulsiona.",
        "Sirve frío. Decora con huevo duro picado y jamón serrano."
      ]
    },
    {
      titulo: "Sopa de ajo",
      categoria: "Primeros",
      ingredientes: ["Ajo", "Pan del día anterior", "Aceite de oliva", "Pimentón dulce", "Jamón serrano", "Huevo", "Caldo de pollo"],
      pasos: [
        "Dora los ajos laminados en aceite. Añade el pan y el pimentón.",
        "Incorpora el jamón y el caldo. Deja cocer. Añade un huevo escalfado y sirve."
      ]
    },
    {
      titulo: "Paella de marisco",
      categoria: "Primeros",
      ingredientes: ["Arroz bomba", "Caldo de pescado", "Gambas", "Mejillones", "Calamares", "Pimiento", "Ajo", "Tomate", "Azafrán"],
      pasos: [
        "Sofríe los mariscos y retíralos. En la misma paella, sofríe el pimiento, el ajo y el tomate.",
        "Añade el arroz y tuéstalo. Incorpora el azafrán y el caldo de pescado hirviendo.",
        "Distribuye el marisco y cocina a fuego medio-alto. Deja reposar antes de servir."
      ]
    },
    {
      titulo: "Cocido madrileño",
      categoria: "Primeros",
      ingredientes: ["Garbanzos", "Morcillo de ternera", "Tocino", "Chorizo", "Morcilla", "Gallina", "Zanahoria", "Patatas", "Repollo"],
      pasos: [
        "Cuece los garbanzos, la carne y los huesos. Desgrasa el caldo. Incorpora las verduras.",
        "Añade los embutidos. Sirve en tres vuelcos: sopa, garbanzos y verduras, y carnes y embutidos."
      ]
    },
    {
      titulo: "Fabada asturiana",
      categoria: "Primeros",
      ingredientes: ["Fabes", "Chorizo asturiano", "Morcilla asturiana", "Lacón", "Panceta", "Ajo", "Cebolla", "Pimentón dulce"],
      pasos: [
        "Deja las fabes a remojo la noche anterior. En una olla, cocina las fabes con el chorizo, la morcilla, el lacón y la panceta.",
        "Sofríe el ajo y la cebolla. Añádelos a las fabes con el pimentón. Deja cocer a fuego lento."
      ]
    },
    {
      titulo: "Sopa de cocido",
      categoria: "Primeros",
      ingredientes: ["Caldo de cocido", "Fideos de cocido", "Garbanzos", "Carne de cocido"],
      pasos: [
        "Cuela el caldo del cocido y ponlo a hervir. Añade los fideos y cocina hasta que estén tiernos.",
        "Sirve la sopa con los garbanzos y la carne picada del cocido."
      ]
    },
    {
      titulo: "Sopa de pescado y marisco",
      categoria: "Primeros",
      ingredientes: ["Caldo de pescado", "Merluza", "Gambas", "Almejas", "Cebolla", "Ajo", "Pan frito"],
      pasos: [
        "Sofríe la cebolla y el ajo. Añade el pescado y el marisco. Vierte el caldo y cocina.",
        "Tritura el pan frito y añádelo para espesar la sopa. Sirve."
      ]
    },
    {
      titulo: "Ensalada de tomate y ventresca",
      categoria: "Primeros",
      ingredientes: ["Tomates de temporada", "Ventresca de atún en aceite de oliva", "Aceitunas negras", "Cebolleta", "Aceite de oliva", "Sal"],
      pasos: [
        "Corta los tomates en rodajas y la cebolleta en juliana. Coloca todo en un plato.",
        "Añade la ventresca de atún y las aceitunas negras. Aliña con aceite de oliva y sal."
      ]
    },
    {
      titulo: "Crema de calabacín",
      categoria: "Primeros",
      ingredientes: ["Calabacín", "Puerro", "Patata", "Caldo de verduras", "Nata líquida", "Pimienta negra", "Sal"],
      pasos: [
        "Sofríe el puerro y el calabacín. Añade la patata y el caldo de verduras. Cocina hasta que todo esté tierno.",
        "Tritura con una batidora. Añade la nata líquida, la pimienta y la sal. Calienta y sirve."
      ]
    },
    // --- SEGUNDOS ---
    {
      titulo: "Cordero asado",
      categoria: "Segundos",
      ingredientes: ["Pierna de cordero", "Manteca de cerdo", "Agua", "Ajo", "Romero", "Tomillo", "Vino blanco", "Sal"],
      pasos: [
        "Unta la pierna de cordero con manteca, ajo y sal. Colócala en una bandeja de horno.",
        "Añade agua, vino, romero y tomillo. Hornea a 180°C durante 1 hora. Voltea y hornea otra hora.",
        "Sube la temperatura para que se dore la piel. Sirve con patatas panaderas."
      ]
    },
    {
      titulo: "Lubina a la espalda",
      categoria: "Segundos",
      ingredientes: ["Lubina", "Ajo", "Guindilla", "Vinagre de Jerez", "Aceite de oliva", "Sal"],
      pasos: [
        "Limpia la lubina y hazle unos cortes. Haz un sofrito con ajo y guindilla.",
        "Hornea la lubina con el sofrito por encima. Añade el vinagre al final. Sirve."
      ]
    },
    {
      titulo: "Albóndigas en salsa de almendras",
      categoria: "Segundos",
      ingredientes: ["Carne picada de ternera", "Pan rallado", "Leche", "Huevo", "Almendras", "Cebolla", "Ajo", "Vino blanco"],
      pasos: [
        "Prepara las albóndigas con la carne, pan rallado y huevo. Fríelas y resérvalas.",
        "Sofríe la cebolla y el ajo. Añade el vino y las almendras. Tritura la salsa y cocina las albóndigas en ella."
      ]
    },
    {
      titulo: "Cochinillo asado",
      categoria: "Segundos",
      ingredientes: ["Cochinillo", "Sal", "Agua", "Manteca de cerdo", "Patatas"],
      pasos: [
        "Frota el cochinillo con sal. Ponlo en una bandeja de horno con agua y hornea a 180°C.",
        "A mitad de cocción, voltea el cochinillo y úntalo con manteca. Sube la temperatura para que la piel quede crujiente."
      ]
    },
    {
      titulo: "Merluza a la vasca",
      categoria: "Segundos",
      ingredientes: ["Merluza", "Almejas", "Gambas", "Guisantes", "Ajo", "Cebolla", "Vino blanco", "Caldo de pescado"],
      pasos: [
        "Sofríe el ajo y la cebolla. Añade las gambas y las almejas. Vierte el vino y el caldo.",
        "Incorpora los guisantes y la merluza. Cocina a fuego lento hasta que se haga el pescado."
      ]
    },
    {
      titulo: "Conejo al ajillo",
      categoria: "Segundos",
      ingredientes: ["Conejo", "Ajo", "Vino blanco", "Romero", "Patatas", "Aceite de oliva", "Sal"],
      pasos: [
        "Dora los trozos de conejo en aceite de oliva. Añade los ajos y el romero. Vierte el vino y deja que se evapore.",
        "Baja el fuego y cocina lentamente. Sirve con patatas fritas."
      ]
    },
    {
      titulo: "Chuletas de cordero a la brasa",
      categoria: "Segundos",
      ingredientes: ["Chuletas de cordero", "Aceite de oliva", "Sal"],
      pasos: [
        "Sazona las chuletas con sal. Cocínalas a la brasa o en una plancha caliente.",
        "Dóralas por ambos lados, dejándolas al punto que te gusten. Sirve con un poco de aceite de oliva."
      ]
    },
    {
      titulo: "Bacalao a la vizcaína",
      categoria: "Segundos",
      ingredientes: ["Bacalao desalado", "Pimientos choriceros", "Cebolla", "Ajo", "Aceite de oliva"],
      pasos: [
        "Sofríe la cebolla y el ajo. Añade los pimientos choriceros picados.",
        "Incorpora el bacalao y cocina a fuego lento. Remueve para ligar la salsa. Sirve."
      ]
    },
    {
      titulo: "Pollo a la cerveza",
      categoria: "Segundos",
      ingredientes: ["Pollo en trozos", "Cebolla", "Ajo", "Pimiento", "Cerveza", "Caldo de pollo", "Harina"],
      pasos: [
        "Salpimenta el pollo y dóralo en aceite. Retira el pollo. Sofríe la cebolla, el ajo y el pimiento.",
        "Vuelve a añadir el pollo y espolvorea con harina. Vierte la cerveza y el caldo. Cocina a fuego lento."
      ]
    },
    {
      titulo: "Sepia a la plancha",
      categoria: "Segundos",
      ingredientes: ["Sepia", "Ajo", "Perejil", "Aceite de oliva", "Sal"],
      pasos: [
        "Limpia la sepia y córtala. Dórala en una plancha muy caliente. Añade sal.",
        "Cuando esté hecha, añade un majado de ajo y perejil picado con aceite. Sirve con limón."
      ]
    },
    // --- POSTRES ---
    {
      titulo: "Arroz con leche",
      categoria: "Postres",
      ingredientes: ["Arroz", "Leche entera", "Azúcar", "Cáscara de limón", "Canela en rama", "Canela en polvo"],
      pasos: [
        "En una olla, cocina el arroz con la leche, la cáscara de limón y la canela en rama a fuego lento. Remueve constantemente.",
        "Cuando el arroz esté blando, añade el azúcar y remueve. Deja que se enfríe.",
        "Sirve en cuencos y espolvorea con canela en polvo."
      ]
    },
    {
      titulo: "Natillas caseras",
      categoria: "Postres",
      ingredientes: ["Leche entera", "Yemas de huevo", "Azúcar", "Maicena", "Cáscara de limón", "Galletas tipo María"],
      pasos: [
        "Hierve la leche con la cáscara de limón. Aparte, mezcla las yemas con el azúcar y la maicena.",
        "Vierte la leche caliente sobre la mezcla de yemas. Cocina a fuego bajo hasta que espese sin dejar de remover.",
        "Sirve en cuencos, deja enfriar y decora con una galleta."
      ]
    },
    {
      titulo: "Tarta de Santiago",
      categoria: "Postres",
      ingredientes: ["Almendras molidas", "Azúcar", "Huevos", "Ralladura de limón", "Canela", "Azúcar glas"],
      pasos: [
        "Bate los huevos con el azúcar. Añade las almendras, la ralladura de limón y la canela. Mezcla bien.",
        "Vierte la mezcla en un molde y hornea a 180°C durante 30 minutos.",
        "Una vez fría, pon un molde de la Cruz de Santiago encima y espolvorea con azúcar glas. Retira el molde."
      ]
    },
    {
      titulo: "Crema catalana",
      categoria: "Postres",
      ingredientes: ["Leche entera", "Yemas de huevo", "Azúcar", "Maicena", "Cáscara de limón", "Canela en rama"],
      pasos: [
        "Mezcla las yemas con el azúcar y la maicena. Hierve la leche con la canela y la cáscara de limón. Cuela.",
        "Añade la leche a la mezcla de yemas y cocina a fuego bajo hasta que espese. Vierte en cuencos y enfría.",
        "Antes de servir, espolvorea azúcar por encima y quémalo con un soplete."
      ]
    },
    {
      titulo: "Flan de huevo",
      categoria: "Postres",
      ingredientes: ["Huevos", "Leche entera", "Azúcar", "Caramelo líquido"],
      pasos: [
        "Haz un caramelo con azúcar y agua. Vierte en el molde. Bate los huevos, la leche y el azúcar. Mezcla.",
        "Vierte en el molde con el caramelo. Cocina al baño maría en el horno a 180°C durante 45 minutos.",
        "Deja enfriar y desmolda con cuidado."
      ]
    },
    {
      titulo: "Leche frita",
      categoria: "Postres",
      ingredientes: ["Leche", "Azúcar", "Harina de maíz", "Limón", "Canela en rama", "Huevo", "Pan rallado"],
      pasos: [
        "Prepara una crema espesa con la leche, el azúcar, la maicena y el limón. Vierte en un molde y deja enfriar.",
        "Corta en porciones la leche frita. Pasa por huevo y pan rallado. Fríela.",
        "Espolvorea con azúcar y canela."
      ]
    },
    {
      titulo: "Torrijas",
      categoria: "Postres",
      ingredientes: ["Pan duro", "Leche", "Azúcar", "Canela en rama", "Cáscara de limón", "Huevo", "Aceite para freír"],
      pasos: [
        "Hierve la leche con el azúcar, la canela y la cáscara de limón. Cuela y deja enfriar. Empapa el pan en la leche.",
        "Pasa el pan por huevo batido y fríelo en aceite caliente. Escurre y reboza en azúcar y canela."
      ]
    },
    {
      titulo: "Tarta de queso",
      categoria: "Postres",
      ingredientes: ["Galletas", "Mantequilla", "Queso crema", "Nata para montar", "Azúcar", "Huevos"],
      pasos: [
        "Tritura las galletas y mézclalas con la mantequilla derretida para la base. Hornea a 180°C por 10 minutos.",
        "Bate el queso crema con la nata, el azúcar y los huevos. Vierte la mezcla sobre la base y hornea a 180°C por 40 minutos."
      ]
    },
    {
      titulo: "Fresas con nata",
      categoria: "Postres",
      ingredientes: ["Fresas", "Nata para montar", "Azúcar"],
      pasos: [
        "Lava y corta las fresas. Monta la nata con el azúcar. Mezcla ambos ingredientes. Sirve."
      ]
    },
    {
      titulo: "Crema de membrillo con queso",
      categoria: "Postres",
      ingredientes: ["Dulce de membrillo", "Queso fresco de Burgos", "Nueces"],
      pasos: [
        "Corta el membrillo y el queso fresco en cubos. Sírvelos en un plato con las nueces picadas."
      ]
    }
  ];

  // Referencia para la instancia de reconocimiento de voz.
  const [recognition, setRecognition] = useState(null);

  // Función para la síntesis de voz (el asistente que 'habla').
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis API no soportada.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Establece el idioma en español.
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Función para iniciar el modo cocina con una receta específica.
  const startCookingMode = (recipe) => {
    setCurrentRecipe(recipe);
    setCurrentStep(0);
    // El asistente da la bienvenida y anuncia la receta.
    speak(`Comenzamos con la receta de ${recipe.titulo}.`);
  };

  // Función para el reconocimiento de voz (el asistente que 'escucha').
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Reconocimiento de voz no soportado.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'es-ES'; // Establece el idioma en español.
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    // Se activa cuando se detecta un comando de voz.
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Comando de voz detectado:", transcript);
      
      // Lógica para procesar los comandos.
      if (transcript.includes('siguiente')) {
        if (currentStep < currentRecipe.pasos.length - 1) {
          setCurrentStep(prevStep => prevStep + 1);
        } else {
          speak("Ya has llegado al final de la receta.");
        }
      } else if (transcript.includes('anterior')) {
        if (currentStep > 0) {
          setCurrentStep(prevStep => prevStep - 1);
        } else {
          speak("Estás en el primer paso.");
        }
      } else if (transcript.includes('repetir')) {
        speak(currentRecipe.pasos[currentStep]);
      } else if (transcript.includes('salir')) {
        exitCookingMode();
      } else {
        speak("Comando no reconocido. Puedes decir siguiente, anterior, repetir o salir.");
      }
    };

    // Se activa cuando el reconocimiento de voz termina.
    rec.onend = () => {
      // Reinicia el reconocimiento si todavía estamos en el modo cocina.
      if (currentRecipe) {
        setTimeout(() => rec.start(), 500); // Pequeño retraso para evitar errores de sobrecarga.
      }
    };
    
    setRecognition(rec);
    rec.start();
  };
  
  // Función para salir del modo cocina.
  const exitCookingMode = () => {
    setCurrentRecipe(null);
    if (recognition) {
      recognition.stop();
    }
    speak("Has salido del modo de cocina. ¡Buen provecho!");
  };

  // Este efecto se ejecuta cada vez que cambia el paso o la receta.
  // Inicia la síntesis de voz para leer el nuevo paso.
  useEffect(() => {
    if (currentRecipe) {
      speak(`Paso ${currentStep + 1}. ${currentRecipe.pasos[currentStep]}`);
    }
  }, [currentStep, currentRecipe]);

  // Filtra las recetas por la categoría actual.
  const filteredRecipes = recipes.filter(recipe => recipe.categoria === currentCategory);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-amber-500">
        Mi Recetario
      </h1>
      
      {/* Condición para mostrar la lista de recetas o el modo cocina. */}
      {!currentRecipe ? (
        <>
          {/* Navegación por pestañas */}
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${currentCategory === 'Aperitivos' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentCategory("Aperitivos")}
            >
              Aperitivos
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${currentCategory === 'Primeros' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentCategory("Primeros")}
            >
              Primeros
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${currentCategory === 'Segundos' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentCategory("Segundos")}
            >
              Segundos
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${currentCategory === 'Postres' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentCategory("Postres")}
            >
              Postres
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
                onClick={() => startCookingMode(recipe)}
              >
                <h2 className="text-2xl font-bold text-blue-400">{recipe.titulo}</h2>
                <p className="mt-2">{recipe.ingredientes.join(', ')}</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-600 rounded-full text-white font-semibold hover:bg-green-700 transition"
                  onClick={(e) => { e.stopPropagation(); startCookingMode(recipe); }}
                >
                  Modo Cocina
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
          <h2 className="text-4xl font-bold mb-4 text-blue-400">{currentRecipe.titulo}</h2>
          <p className="text-lg text-gray-300">Paso {currentStep + 1} de {currentRecipe.pasos.length}</p>
          <p className="text-2xl mt-4">{currentRecipe.pasos[currentStep]}</p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-gray-600 rounded-full text-white hover:bg-gray-500 transition"
              onClick={() => setCurrentStep(prevStep => Math.max(0, prevStep - 1))}
            >
              Anterior
            </button>
            <button
              className="px-4 py-2 bg-green-600 rounded-full text-white hover:bg-green-500 transition"
              onClick={() => speak(currentRecipe.pasos[currentStep])}
            >
              Repetir
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition"
              onClick={() => {
                if (currentStep < currentRecipe.pasos.length - 1) {
                  setCurrentStep(prevStep => prevStep + 1);
                } else {
                  speak("Has terminado. ¡Buen provecho!");
                  exitCookingMode();
                }
              }}
            >
              Siguiente
            </button>
            <button
              className="px-4 py-2 bg-red-600 rounded-full text-white hover:bg-red-500 transition"
              onClick={exitCookingMode}
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
