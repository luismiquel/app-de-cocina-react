import React, { useState, useEffect } from 'react';

// Componente principal de la aplicación
const App = () => {
  // Estado para controlar la receta actual y el paso
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Datos de las recetas (puedes añadir más aquí)
  const recipes = [
    {
      titulo: "Ensalada de Quinoa Fresca",
      ingredientes: ["1 taza de quinoa", "2 tazas de agua", "1 pepino", "1 tomate", "1/2 cebolla morada", "Zumo de limón", "Aceite de oliva"],
      pasos: [
        "Enjuaga la quinoa bajo agua fría. En una olla, hierve 2 tazas de agua, añade la quinoa, reduce el fuego y cocina por 15 minutos. Deja reposar.",
        "Mientras se enfría, pica el pepino, el tomate y la cebolla morada en dados pequeños.",
        "En un bol grande, mezcla la quinoa cocida y las verduras picadas.",
        "Para el aderezo, combina el zumo de limón, el aceite de oliva y un poco de sal y pimienta al gusto. Viértelo sobre la ensalada y mezcla bien.",
        "Sirve la ensalada fresca."
      ]
    },
    {
      titulo: "Pasta con Salmón y Espinacas",
      ingredientes: ["200g de pasta (fetuccini)", "200g de salmón fresco", "1 manojo de espinacas", "2 dientes de ajo", "200ml de nata líquida", "Aceite de oliva", "Sal y pimienta"],
      pasos: [
        "Cocina la pasta según las instrucciones del paquete. Mientras tanto, corta el salmón en cubos.",
        "En una sartén grande, dora los ajos picados en aceite de oliva. Añade el salmón y cocina por 2-3 minutos.",
        "Agrega las espinacas a la sartén y cocina hasta que se marchiten. Vierte la nata líquida y cocina a fuego bajo hasta que la salsa espese un poco.",
        "Escurre la pasta y añádela a la sartén con la salsa. Saltea todo junto para que se integren los sabores.",
        "Sirve inmediatamente, decorando con un poco de eneldo si lo deseas."
      ]
    },
    {
      titulo: "Mousse de Limón Ligera",
      ingredientes: ["1 lata de leche condensada ligera", "2 limones (zumo y ralladura)", "250ml de nata para montar", "Hojas de menta para decorar"],
      pasos: [
        "En un bol, mezcla la leche condensada con la ralladura y el zumo de los limones. Remueve bien hasta obtener una crema espesa.",
        "En otro bol, monta la nata líquida bien fría hasta que esté firme.",
        "Incorpora la nata montada a la mezcla de limón con movimientos envolventes, para que no pierda aire.",
        "Vierte la mousse en copas individuales y refrigérala durante al menos 2 horas.",
        "Sirve la mousse de limón bien fría y decora con hojas de menta."
      ]
    }
  ];

  // Referencia a la instancia de reconocimiento de voz
  const [recognition, setRecognition] = useState(null);

  // Función para hablar
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis API no soportada.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Función para iniciar el modo cocina
  const startCookingMode = (recipe) => {
    setCurrentRecipe(recipe);
    setCurrentStep(0);
    speak(`Comenzamos con la receta de ${recipe.titulo}.`);
  };

  // Función para el reconocimiento de voz
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Reconocimiento de voz no soportado.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'es-ES';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Comando de voz detectado:", transcript);
      
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

    rec.onend = () => {
      if (currentRecipe) {
        setTimeout(() => rec.start(), 500); // Reiniciar después de un breve retraso
      }
    };
    
    setRecognition(rec);
    rec.start();
  };
  
  // Función para salir del modo cocina
  const exitCookingMode = () => {
    setCurrentRecipe(null);
    if (recognition) {
      recognition.stop();
    }
    speak("Has salido del modo de cocina. ¡Buen provecho!");
  };

  // Efecto para hablar cuando cambia el paso actual
  useEffect(() => {
    if (currentRecipe) {
      speak(`Paso ${currentStep + 1}. ${currentRecipe.pasos[currentStep]}`);
    }
  }, [currentStep, currentRecipe]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-amber-500">
        Mi Recetario
      </h1>
      
      {!currentRecipe ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
          {recipes.map((recipe, index) => (
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
