import './App.css';
import Admin from './pages/Admin';
import React from 'react';
import Login from './pages/login';
import Register from './pages/Register';
import { useEffect, useState } from "react";
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
import Modal from './components/Modal';



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes enviar el error a un servicio externo aquí
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red' }}>
          <h2>Ocurrió un error inesperado.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const [modal , setModal] = useState({message: "", type: ""});
  const [menuOpen, setMenuOpen] = useState(false);

  const showModal = (message, type) => setModal({message, type});
  const closeModal = () => setModal({message: "", type: ""});

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    const currentUser = localStorage.getItem("currentUser");

    if (auth === "true") {
      setIsAuth(true);
      setUser(currentUser);
    }
  }, []);

  const handleDownload = async () => {
    if (!isAuth) {
      showModal("Debes iniciar sesión para descargar el juego.", "error");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const statusRes = await fetch(`${process.env.REACT_APP_API_URL}/api/download/status`, { headers });
      const status = await statusRes.json();

      if (!status.available) {
        showModal("El archivo de descarga aún no está disponible. ¡Vuelve pronto!", "error");
        return;
      }
     const blob = await statusRes.blob();
     const url = window.URL.createObjectURL(blob);
     
     window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error en la descarga:", error);
      showModal("No se pudo conectar con el servidor. Asegúrate de que el backend está activo.", "error");
    }
  };
  
  return (
    
    <div className="App">
      <nav className="navbar">

        <button
          className={`hamburger-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
        <span /><span /><span />
        </button>
        
    </nav>
    {menuOpen && (
      <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}
      <div className={`slide-menu ${menuOpen ? "slide-menu--open" : ""}`}>
        <p className="slide-menu-title">Navegación</p>
        <ul>
          <li><a href="#faq"           onClick={() => setMenuOpen(false)}>FAQ</a></li>
          <li><a href="#caracteristicas" onClick={() => setMenuOpen(false)}>Características</a></li>
          <li><a href="#details"       onClick={() => setMenuOpen(false)}>Detalles</a></li>
          <li><a href="#download"      onClick={() => setMenuOpen(false)}>Descargar</a></li>
          <li><a href="#design"        onClick={() => setMenuOpen(false)}>Diseño</a></li>
        </ul>
      </div>
        <Modal message={modal.message} type={modal.type} onClose={closeModal} />
      <section className="hero">
        {!isAuth && (
        <div className="info-box">
          <p className="info-title">
            ¿Quieres recibir notificaciones de los cambios?
          </p>
          <p className="info-actions">
            <Link to="/login">Inicia sesión</Link> o{" "}
            <Link to="/register">regístrate</Link> para estar al tanto de todas
            las novedades sobre Rouge.
          </p>
        </div>
      )}

      {isAuth && (
        <div className="info-box">
          <p>Usuario: {user}</p>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.clear();
              setIsAuth(false);
              setUser("");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
        
        <h1 className="hero-title">
          ROGUE
        </h1>
          <p className='description'>Es un videojuego de Rougelike y metroidvania, donde cada elección importa. Explora, combate y descubre una historia que se adapta a tu forma de jugar.</p>
        <h2>¡Únete a la Aventura!</h2>
          <p>Prepárate para una experiencia de juego inolvidable. ¡Descubre Rouge y sumérgete en un mundo donde cada decisión cuenta!</p>
        <section className='WAW?'>
          <h2>¿Quienes somos?</h2>
          <p>Somos dos estudiantes del grado superior de desarrollo de aplicaciones web en el instituto Puig Castellar decidimos crear Rouge como nuestro proyecto final.</p>
          <p>Esta idea surgio a nuestra inspiracion en los juegos estilo Rougelike, uno de nuestros referentes el aclamado The binding of Isaac.</p>
          <p>Queremos crear un juego que combine la emoción de los juegos de acción con la profundidad de los juegos de rol, ofreciendo a los jugadores una experiencia única y desafiante.</p>         
        </section>
        <br/>
        <h2>Historia</h2>

        <div className="story">
          <p>Dicen que es un caballero que se despierta un día a las afueras de un castillo del que no puede escapar… y que su único destino es vagar por él, muriendo una y otra vez a manos de monstruos.</p>
          <p>Nadie recuerda su nombre. Ni siquiera él.</p>
          <p>Cuando abre los ojos por primera vez, el cielo está cubierto por nubes inmóviles, como si el tiempo se hubiera detenido. Frente a él se alza un castillo imposible: torres torcidas, murallas que parecen respirar y puertas que se abren solas, invitándolo a entrar.</p>

          <p className="story-beat">No tiene elección.</p>

          <p>Al cruzar el umbral, siente cómo algo se rompe dentro de él… y también cómo algo se ata. El castillo está vivo. Cada sala es distinta, cambiante. Pasillos que no llevan al mismo lugar dos veces, escaleras que se retuercen como serpientes, y sombras que observan desde rincones donde no debería haber nada.</p>
          <p>Pronto aparecen los primeros monstruos: criaturas deformes, antiguos guardianes, ecos de guerreros que fracasaron antes que él.</p>

          <p className="story-beat">Muere rápido. Un golpe. Un error. Oscuridad.</p>

          <p>Y entonces… despierta otra vez. De nuevo en las afueras del castillo. Con su cuerpo intacto, pero su mente un poco más fragmentada.</p>
        </div>
      <div id="caracteristicas" className="Caracteristicas">

        <h2>Características Principales</h2>

        <div className="features-table">


          <div className="feature-title">Gráficos Retro Modernos</div>
          <div className="feature-desc">
            Estilo visual pixel art con efectos modernos que crean una atmósfera única y envolvente.
          </div>

          <div className="feature-title">Combate Dinámico</div>
          <div className="feature-desc">
            Sistema de combate fluido que combina ataques cuerpo a cuerpo y diferentes estilos desbloqueables.
          </div>

          <div className="feature-title">Progresión del Personaje</div>
          <div className="feature-desc">
            Personaliza tu estilo de juego con mejoras y habilidades únicas.
          </div>

          <div className="feature-title">Exploración Profunda</div>
          <div className="feature-desc">
            Descubre secretos ocultos y áreas desbloqueables.
          </div>

        </div>

      </div>
    <br/>
    <h2 id="details">Detalles sobre el Juego</h2>
    <div className="game-details">
    <p>Este apartado te explicaremos los aspectos más interesantes del juego.</p>  
    <br/>
    <h3>Controles</h3>
    <div className="controls-list">
      <div className="control-row">
        <img src="/assets/Controls/wasd.png" alt="Teclas WASD" />
        <div>
          <h4>Movimiento</h4>
          <p>Usa las teclas <strong>W A S D</strong> para mover al personaje por el escenario.</p>
        </div>
      </div>

      <div className="control-row">
        <img src="/assets/Controls/space_key_s.png" alt="Barra espaciadora" />
        <div>
          <h4>Saltar</h4>
          <p>Pulsa la <strong>barra espaciadora</strong> para hacer saltar al personaje.</p>
        </div>
      </div>

      <div className="control-row">
        <img src="/assets/Controls/letter_e.png" alt="Tecla E" />
        <div>
          <h4>Pausar/Tienda</h4>
          <p>Pulsa <strong>E</strong> para pausar el juego o acceder a la tienda.</p>
        </div>
      </div>

      <div className="control-row">
        <img src="/assets/Controls/letter_j.png" alt="Tecla J" />
        <div>
          <h4>Atacar</h4>
          <p>Pulsa <strong>J</strong> para realizar un ataque o acción de combate.</p>
        </div>
      </div>
    </div>
    <br/>
    <h3>Enemigos</h3>
    <p>En Rouge, te enfrentarás a una variedad de enemigos, cada uno con sus propias 
    habilidades y patrones de ataque. Desde los básicos hasta los jefes finales, cada 
    encuentro será un desafío único que pondrá a prueba tus habilidades y estrategias.</p>

  <div className="enemies-list">

    <div className="enemy-row">
      <img src="/assets/Characters/enemies/Golem.PNG" alt="Golem" />
      <div>
        <h4>Golem</h4>
        <p>Una criatura de piedra de movimientos lentos pero golpes devastadores. 
        Resiste el daño físico, busca sus puntos débiles.</p>
      </div>
    </div>

    <div className="enemy-row">
      <img src="/assets/Characters/enemies/GolemFuerte.PNG" alt="Golem Fuerte" />
      <div>
        <h4>Golem Fuerte</h4>
        <p>Versión reforzada del Golem. Mayor armadura y ataques en área que 
        sacuden el suelo a su alrededor.</p>
      </div>
    </div>

    <div className="enemy-row">
      <img src="/assets/Characters/enemies/JefeSlime.PNG" alt="Jefe Slime" />
      <div>
        <h4>Jefe Slime</h4>
        <p>Jefe de la guarida de slimes. Doble el tamaño y con un poco más de vida que de costumbre. Cuidado que este si que pega.</p>
      </div>
    </div>

    <div className="enemy-row">
      <img src="/assets/Characters/enemies/ReyGolem.PNG" alt="Rey Golem" />
      <div>
        <h4>Rey Golem</h4>
        <p>El monarca de piedra. Jefe final de gran tamaño con ataques sísmicos 
        capaces de atravesar toda la pantalla.</p>
      </div>
    </div>

    <div className="enemy-row">
      <img src="/assets/Characters/enemies/ReySlime.PNG" alt="Rey Slime" />
      <div>
        <h4>Rey Slime</h4>
        <p>La masa gelatinosa definitiva. Triple el tamaño y con más vida que los slimes normales.</p>
      </div>
    </div>

      <div className="enemy-row">
        <img src="/assets/Characters/enemies/Captura3.PNG" alt="Enemigo" />
        <div>
          <h4>Slime</h4>
          <p>Un moco pequeño y pegajoso. Cuidado al tocarlo que puede ser peligroso. Facil de vencer.</p>
        </div>
      </div>
    </div>
    <br/>
    <h3>Monedas</h3>
    <p>Durante la aventura encontraras diferentes monedas por el castillo que te ayudaran a comprar mejoras dentro de la tienda</p>

    <div className="coins-list">

      <div className="coin-row">
        <img src="/assets/Values/Restos_de_slime.PNG" alt="Restos de Slime" />
        <div>
          <h4>Restos de Slime</h4>
          <p>Moneda básica que sueltas por el castillo. Son abundantes por el castillos con solo el valor de 1.</p>
        </div>
      </div>

      <div className="coin-row">
        <img src="/assets/Values/Trozo_de_cobre.PNG" alt="Trozo de Cobre" />
        <div>
          <h4>Trozo de Cobre</h4>
          <p>Moneda intermedia que son un poco más valiosas que los restos de slime. se pueden encontrar por el castillo.</p>
        </div>
      </div>

      <div className="coin-row">
        <img src="/assets/Values/Trozo_de_oro.PNG" alt="Trozo de Oro" />
        <div>
          <h4>Trozo de Oro</h4>
          <p>Uno de los minerales mas valiosos del castillo. Se pueden encontrar en zonas mas profundas.</p>
        </div>
      </div>
      <div className="coin-row">
        <img src="/assets/Values/Ojo_de_Ahriman.PNG" alt="Ojo de Ahriman" />
        <div>
          <h4>Ojo de Ahriman</h4>
          <p>Moneda legendaria solo unos pocos pudieron obtener. Muy rara y valiosa, utilizada para comprar los objetos más poderosos.</p>
        </div>
      </div>
    </div>

  </div>
      <br/>
      </section>
      <section className='download'>
        <h2 id="download">¡Descarga Rouge Ahora!</h2>
        <p>Disponible para PC y Mac. ¡No pierdas la oportunidad de vivir esta aventura única!</p>
        <button className='download-button' onClick={handleDownload}>
          {isAuth ? "Descargar" : "Inicia sesión para descargar"}
        </button>
      </section>

      <section className='design'>
        <h2 id="design">Diseño y Estilo Visual</h2>
        <p>Rouge presenta un estilo visual pixel art que combina la nostalgia de los juegos retro con efectos modernos para crear una atmósfera única y envolvente. Cada entorno está cuidadosamente diseñado para ofrecer una experiencia visual rica y detallada, desde las oscuras mazmorras hasta los vibrantes paisajes exteriores.</p>
        <p>Vamos a usar unos assets de diseño para crear un ambiente inmersivo.</p>
        <div className='design-images'>
          <h2>Backgrounds</h2>
          <div className='imagenes-bg'>
            <img src="/assets/Background/layer_1.png" alt="Background layer_1" className='design-image'/>
            <img src="/assets/Background/layer_2.png" alt="Background layer_2" className='design-image'/>
            <img src="/assets/Background/layer_3.png" alt="Background layer_3" className='design-image'/>
          </div>

          <h2>Decorations</h2>
          <div className='imagenes-decorations'>
            <img src="/assets/Decorations/axe.png" />
            <img src="/assets/Decorations/barrel.png"/>
            <img src="/assets/Decorations/bag_1.png" />
            <img src="/assets/Decorations/bag_2.png" />
            <img src="/assets/Decorations/books.png" />
            <img src="/assets/Decorations/barrel_damaged.png"/>
            <img src="/assets/Decorations/bookshelf_1.png"/>
            <img src="/assets/Decorations/bookshelf_2.png"/>
            <img src="/assets/Decorations/chair_1.png"/>
            <img src="/assets/Decorations/chair_2.png"/>
            <img src="/assets/Decorations/crate_1.png"/>
            <img src="/assets/Decorations/crate_1_damaged.png"/>
            <img src="/assets/Decorations/crate_2.png"/>
            <img src="/assets/Decorations/crate_2_damaged.png"/>
            <img src="/assets/Decorations/crate_3.png"/>
            <img src="/assets/Decorations/crate_3_damaged.png"/>
            <img src="/assets/Decorations/curtain_blue_1.png"/>
            <img src="/assets/Decorations/curtain_blue_2.png"/>
            <img src="/assets/Decorations/curtain_red_1.png"/>
            <img src="/assets/Decorations/curtain_red_2.png"/>
            <img src="/assets/Decorations/door.png"/>
            <img src="/assets/Decorations/flag_blue.png"/>
            <img src="/assets/Decorations/flag_red.png"/>
            <img src="/assets/Decorations/langdebeve.png"/>
            <img src="/assets/Decorations/pole_axe.png"/>
            <img src="/assets/Decorations/potions_1.png"/>
            <img src="/assets/Decorations/potions_2.png"/>
            <img src="/assets/Decorations/potion_1.png"/>
            <img src="/assets/Decorations/potion_2.png"/>
            <img src="/assets/Decorations/potion_3.png"/>
            <img src="/assets/Decorations/potion_4.png"/>
            <img src="/assets/Decorations/scroll_1.png"/>
            <img src="/assets/Decorations/scroll_2.png"/>
            <img src="/assets/Decorations/sword_1.png" />
            <img src="/assets/Decorations/sword_2.png" />
            <img src="/assets/Decorations/table_noshadow.png" />
            <img src="/assets/Decorations/table_shadow.png" />
            <img src="/assets/Decorations/weapon_rack.png" />
            <img src="/assets/Decorations/wood_plank_1.png" />
            <img src="/assets/Decorations/wood_plank_2.png" />
            <img src="/assets/Decorations/wood_plank_3.png" />
          </div>

          <h2>Decorations Animadas</h2>
          <div className='imagenes-animated-decorations'>
            <AnimatedDecoration title="Candelabrum Small" frames={[
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_1.png',
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_2.png',
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_3.png',
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_4.png',
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_5.png',
              '/assets/Decorations/Animated Decorations/candelabrum_small/candelabrum_small_6.png',
            ]} />
            <AnimatedDecoration title="Candelabrum Tall" frames={[
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_1.png',
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_2.png',
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_3.png',
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_4.png',
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_5.png',
              '/assets/Decorations/Animated Decorations/candelabrum_tall/candelabrum_tall_6.png',
            ]} />
            <AnimatedDecoration title="Candle 1" frames={[
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_1.png',
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_2.png',
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_3.png',
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_4.png',
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_5.png',
              '/assets/Decorations/Animated Decorations/candle_1/candle_1_6.png',
            ]} />
            <AnimatedDecoration title="Candle 2" frames={[
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_1.png',
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_2.png',
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_3.png',
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_4.png',
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_5.png',
              '/assets/Decorations/Animated Decorations/candle_2/candle_2_6.png',
            ]} />
            <AnimatedDecoration title="Candle 3" frames={[
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_1.png',
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_2.png',
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_3.png',
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_4.png',
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_5.png',
              '/assets/Decorations/Animated Decorations/candle_3/candle_3_6.png',
            ]} />
            <AnimatedDecoration title="Candle Blue 1" frames={[
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_1.png',
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_2.png',
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_3.png',
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_4.png',
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_5.png',
              '/assets/Decorations/Animated Decorations/candle_blue_1/candle_blue_1_6.png',
            ]} />
            <AnimatedDecoration title="Candle Blue 2" frames={[
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_1.png',
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_2.png',
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_3.png',
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_4.png',
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_5.png',
              '/assets/Decorations/Animated Decorations/candle_blue_2/candle_blue_2_6.png',
            ]} />
            <AnimatedDecoration title="Candle Blue 3" frames={[
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_1.png',
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_2.png',
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_3.png',
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_4.png',
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_5.png',
              '/assets/Decorations/Animated Decorations/candle_blue_3/candle_blue_3_6.png',
            ]} />
            <AnimatedDecoration title="Chest" frames={[
              '/assets/Decorations/Animated Decorations/chest/chest_1.png',
              '/assets/Decorations/Animated Decorations/chest/chest_2.png',
              '/assets/Decorations/Animated Decorations/chest/chest_3.png',
              '/assets/Decorations/Animated Decorations/chest/chest_4.png',
              '/assets/Decorations/Animated Decorations/chest/chest_5.png',
              '/assets/Decorations/Animated Decorations/chest/chest_damaged.png',
            ]} />
            <AnimatedDecoration title="Lever Floor" frames={[
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_1.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_2.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_3.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_4.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_5.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_6.png',
              '/assets/Decorations/Animated Decorations/lever_floor/lever_floor_7.png',
            ]} />
            <AnimatedDecoration title="Lever Wall" frames={[
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_1.png',
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_2.png',
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_3.png',
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_4.png',
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_5.png',
              '/assets/Decorations/Animated Decorations/lever_wall/lever_wall_6.png',
            ]} />
            <AnimatedDecoration title="Torch Big" frames={[
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_1.png',
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_2.png',
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_3.png',
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_4.png',
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_5.png',
              '/assets/Decorations/Animated Decorations/torch_big/torch_big_6.png'
            ]} />
            <AnimatedDecoration title="Torch Big Blue" frames={[
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_1.png',
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_2.png',
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_3.png',
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_4.png',
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_5.png',
              '/assets/Decorations/Animated Decorations/torch_big_blue/torch_big_blue_6.png'            ]} />
            <AnimatedDecoration title="Torch Small" frames={[
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_1.png',
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_2.png',
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_3.png',
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_4.png',
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_5.png',
              '/assets/Decorations/Animated Decorations/torch_small/torch_small_6.png'
            ]} />
            <AnimatedDecoration title="Torch Small Blue" frames={[
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_1.png',
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_2.png',
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_3.png',
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_4.png',
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_5.png',
              '/assets/Decorations/Animated Decorations/torch_small_blue/torch_small_blue_6.png'
            ]} />
            </div>

          <h2>Tiles</h2>
          <div className='imagenes-tiles'>
            <img src="/assets/Tiles/arch_1.png" alt="Tiles arch_1" className='tile'/>
            <img src="/assets/Tiles/arch_2.png" alt="Tiles arch_2" className='tile'/>
            <img src="/assets/Tiles/arch_3.png" alt="Tiles arch_3" className='tile'/>
            <img src="/assets/Tiles/arch_4.png" alt="Tiles arch_4" className='tile'/>
            <img src="/assets/Tiles/arch_5.png" alt="Tiles arch_5" className='tile'/>
            <img src="/assets/Tiles/arch_6.png" alt="Tiles arch_6" className='tile'/>
            <img src="/assets/Tiles/arch_7.png" alt="Tiles arch_7" className='tile'/>
            <img src="/assets/Tiles/blank.png" alt="Tiles blank" className='tile'/>
            <img src="/assets/Tiles/brick_1.png" alt="Tiles brick_1" className='tile'/>
            <img src="/assets/Tiles/brick_10.png" alt="Tiles brick_10" className='tile'/>
            <img src="/assets/Tiles/brick_11.png" alt="Tiles brick_11" className='tile'/>
            <img src="/assets/Tiles/brick_12.png" alt="Tiles brick_12" className='tile'/>
            <img src="/assets/Tiles/brick_13.png" alt="Tiles brick_13" className='tile'/>
            <img src="/assets/Tiles/brick_14.png" alt="Tiles brick_14" className='tile'/>
            <img src="/assets/Tiles/brick_15.png" alt="Tiles brick_15" className='tile'/>
            <img src="/assets/Tiles/brick_16.png" alt="Tiles brick_16" className='tile'/>
            <img src="/assets/Tiles/brick_2.png" alt="Tiles brick_2" className='tile'/>
            <img src="/assets/Tiles/brick_3.png" alt="Tiles brick_3" className='tile'/>
            <img src="/assets/Tiles/brick_4.png" alt="Tiles brick_4" className='tile'/>
            <img src="/assets/Tiles/brick_5.png" alt="Tiles brick_5" className='tile'/>
            <img src="/assets/Tiles/brick_6.png" alt="Tiles brick_6" className='tile'/>
            <img src="/assets/Tiles/brick_7.png" alt="Tiles brick_7" className='tile'/>
            <img src="/assets/Tiles/brick_8.png" alt="Tiles brick_8" className='tile'/>
            <img src="/assets/Tiles/brick_9.png" alt="Tiles brick_9" className='tile'/>
            <img src="/assets/Tiles/brick_side_left_1.png" alt="Tiles brick_side_left_1" className='tile'/>
            <img src="/assets/Tiles/brick_side_left_2.png" alt="Tiles brick_side_left_2" className='tile'/>
            <img src="/assets/Tiles/brick_side_right_1.png" alt="Tiles brick_side_right_1" className='tile'/>
            <img src="/assets/Tiles/brick_side_right_2.png" alt="Tiles brick_side_right_2" className='tile'/>
            <img src="/assets/Tiles/ceiling_1.png" alt="Tiles ceiling_1" className='tile'/>
            <img src="/assets/Tiles/ceiling_2.png" alt="Tiles ceiling_2" className='tile'/>
            <img src="/assets/Tiles/ceiling_3.png" alt="Tiles ceiling_3" className='tile'/>
            <img src="/assets/Tiles/ceiling_4.png" alt="Tiles ceiling_4" className='tile'/>
            <img src="/assets/Tiles/ceiling_corner_left.png" alt="Tiles ceiling_corner_left" className='tile'/>
            <img src="/assets/Tiles/ceiling_corner_right.png" alt="Tiles ceiling_corner_right" className='tile'/>
            <img src="/assets/Tiles/ceiling_transparent_1.png" alt="Tiles ceiling_transparent_1" className='tile'/>
            <img src="/assets/Tiles/ceiling_transparent_2.png" alt="Tiles ceiling_transparent_2" className='tile'/>
            <img src="/assets/Tiles/column_1.png" alt="Tiles column_1" className='tile'/>
            <img src="/assets/Tiles/column_2.png" alt="Tiles column_2" className='tile'/>
            <img src="/assets/Tiles/column_3.png" alt="Tiles column_3" className='tile'/>
            <img src="/assets/Tiles/column_4.png" alt="Tiles column_4" className='tile'/>
            <img src="/assets/Tiles/column_5.png" alt="Tiles column_5" className='tile'/>
            <img src="/assets/Tiles/column_6.png" alt="Tiles column_6" className='tile'/>
            <img src="/assets/Tiles/column_7.png" alt="Tiles column_7" className='tile'/>
            <img src="/assets/Tiles/column_8.png" alt="Tiles column_8" className='tile'/>
            <img src="/assets/Tiles/damaged_brick_1.png" alt="Tiles damaged_brick_1" className='tile'/>
            <img src="/assets/Tiles/damaged_brick_2.png" alt="Tiles damaged_brick_2" className='tile'/>
            <img src="/assets/Tiles/damaged_brick_3.png" alt="Tiles damaged_brick_3" className='tile'/>
            <img src="/assets/Tiles/damaged_brick_4.png" alt="Tiles damaged_brick_4" className='tile'/>
            <img src="/assets/Tiles/floor_tile_1.png" alt="Tiles floor_tile_1" className='tile'/>
            <img src="/assets/Tiles/floor_tile_2.png" alt="Tiles floor_tile_2" className='tile'/>
            <img src="/assets/Tiles/floor_tile_3.png" alt="Tiles floor_tile_3" className='tile'/>
            <img src="/assets/Tiles/floor_tile_4.png" alt="Tiles floor_tile_4" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_1.png" alt="Tiles floor_tile_carpet_1" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_2.png" alt="Tiles floor_tile_carpet_2" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_3.png" alt="Tiles floor_tile_carpet_3" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_4.png" alt="Tiles floor_tile_carpet_4" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_corner_left.png" alt="Tiles floor_tile_carpet_corner_left" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_corner_right.png" alt="Tiles floor_tile_carpet_corner_right" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_transition_1.png" alt="Tiles floor_tile_carpet_transition_1" className='tile'/>
            <img src="/assets/Tiles/floor_tile_carpet_transition_2.png" alt="Tiles floor_tile_carpet_transition_2" className='tile'/>
            <img src="/assets/Tiles/floor_tile_corner_left.png" alt="Tiles floor_tile_corner_left" className='tile'/>
            <img src="/assets/Tiles/floor_tile_corner_right.png" alt="Tiles floor_tile_corner_right" className='tile'/>
            <img src="/assets/Tiles/floor_tile_wood_carpet_transition_1.png" alt="Tiles floor_tile_wood_carpet_transition_1" className='tile'/>
            <img src="/assets/Tiles/floor_tile_wood_carpet_transition_2.png" alt="Tiles floor_tile_wood_carpet_transition_2" className='tile'/>
            <img src="/assets/Tiles/floor_tile_wood_transition_1.png" alt="Tiles floor_tile_wood_transition_1" className='tile'/>
            <img src="/assets/Tiles/floor_tile_wood_transition_2.png" alt="Tiles floor_tile_wood_transition_2" className='tile'/>
            <img src="/assets/Tiles/floor_wood_1.png" alt="Tiles floor_wood_1" className='tile'/>
            <img src="/assets/Tiles/floor_wood_2.png" alt="Tiles floor_wood_2" className='tile'/>
            <img src="/assets/Tiles/floor_wood_3.png" alt="Tiles floor_wood_3" className='tile'/>
            <img src="/assets/Tiles/floor_wood_4.png" alt="Tiles floor_wood_4" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_1.png" alt="Tiles floor_wood_carpet_1" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_2.png" alt="Tiles floor_wood_carpet_2" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_3.png" alt="Tiles floor_wood_carpet_3" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_4.png" alt="Tiles floor_wood_carpet_4" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_corner_left.png" alt="Tiles floor_wood_carpet_corner_left" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_corner_right.png" alt="Tiles floor_wood_carpet_corner_right" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_transition_1.png" alt="Tiles floor_wood_carpet_transition_1" className='tile'/>
            <img src="/assets/Tiles/floor_wood_carpet_transition_2.png" alt="Tiles floor_wood_carpet_transition_2" className='tile'/>
            <img src="/assets/Tiles/floor_wood_corner_left.png" alt="Tiles floor_wood_corner_left" className='tile'/>
            <img src="/assets/Tiles/floor_wood_corner_right.png" alt="Tiles floor_wood_corner_right" className='tile'/>
            <img src="/assets/Tiles/lion_column_1.png" alt="Tiles lion_column_1" className='tile'/>
            <img src="/assets/Tiles/lion_column_10.png" alt="Tiles lion_column_10" className='tile'/>
            <img src="/assets/Tiles/lion_column_11.png" alt="Tiles lion_column_11" className='tile'/>
            <img src="/assets/Tiles/lion_column_12.png" alt="Tiles lion_column_12" className='tile'/>
            <img src="/assets/Tiles/lion_column_2.png" alt="Tiles lion_column_2" className='tile'/>
            <img src="/assets/Tiles/lion_column_3.png" alt="Tiles lion_column_3" className='tile'/>
            <img src="/assets/Tiles/lion_column_4.png" alt="Tiles lion_column_4" className='tile'/>
            <img src="/assets/Tiles/lion_column_5.png" alt="Tiles lion_column_5" className='tile'/>
            <img src="/assets/Tiles/lion_column_6.png" alt="Tiles lion_column_6" className='tile'/>
            <img src="/assets/Tiles/lion_column_7.png" alt="Tiles lion_column_7" className='tile'/>
            <img src="/assets/Tiles/lion_column_8.png" alt="Tiles lion_column_8" className='tile'/>
            <img src="/assets/Tiles/lion_column_9.png" alt="Tiles lion_column_9" className='tile'/>
            <img src="/assets/Tiles/merlons_1.png" alt="Tiles merlons_1" className='tile'/>
            <img src="/assets/Tiles/merlons_2.png" alt="Tiles merlons_2" className='tile'/>
            <img src="/assets/Tiles/merlons_3.png" alt="Tiles merlons_3" className='tile'/>
            <img src="/assets/Tiles/merlons_4.png" alt="Tiles merlons_4" className='tile'/>
            <img src="/assets/Tiles/merlons_5.png" alt="Tiles merlons_5" className='tile'/>
            <img src="/assets/Tiles/platform_1.png" alt="Tiles platform_1" className='tile'/>
            <img src="/assets/Tiles/platform_2.png" alt="Tiles platform_2" className='tile'/>
            <img src="/assets/Tiles/platform_3.png" alt="Tiles platform_3" className='tile'/>
            <img src="/assets/Tiles/platform_4.png" alt="Tiles platform_4" className='tile'/>
            <img src="/assets/Tiles/platform_shadow.png" alt="Tiles platform_shadow" className='tile'/>
            <img src="/assets/Tiles/platform_wall_connection_left.png" alt="Tiles platform_wall_connection_left" className='tile'/>
            <img src="/assets/Tiles/platform_wall_connection_right.png" alt="Tiles platform_wall_connection_right" className='tile'/>
            <img src="/assets/Tiles/spikes.png" alt="Tiles spikes" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_1.png" alt="Tiles stairs_tile_1" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_2.png" alt="Tiles stairs_tile_2" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_3.png" alt="Tiles stairs_tile_3" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_4.png" alt="Tiles stairs_tile_4" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_carpet_1.png" alt="Tiles stairs_tile_carpet_1" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_carpet_2.png" alt="Tiles stairs_tile_carpet_2" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_carpet_3.png" alt="Tiles stairs_tile_carpet_3" className='tile'/>
            <img src="/assets/Tiles/stairs_tile_carpet_4.png" alt="Tiles stairs_tile_carpet_4" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_1.png" alt="Tiles stairs_wood_1" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_2.png" alt="Tiles stairs_wood_2" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_3.png" alt="Tiles stairs_wood_3" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_4.png" alt="Tiles stairs_wood_4" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_carpet_1.png" alt="Tiles stairs_wood_carpet_1" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_carpet_2.png" alt="Tiles stairs_wood_carpet_2" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_carpet_3.png" alt="Tiles stairs_wood_carpet_3" className='tile'/>
            <img src="/assets/Tiles/stairs_wood_carpet_4.png" alt="Tiles stairs_wood_carpet_4" className='tile'/>
            <img src="/assets/Tiles/tile_side_left.png" alt="Tiles tile_side_left" className='tile'/>
            <img src="/assets/Tiles/tile_side_right.png" alt="Tiles tile_side_right" className='tile'/>
            <img src="/assets/Tiles/wall_1.png" alt="Tiles wall_1" className='tile'/>
            <img src="/assets/Tiles/wall_10.png" alt="Tiles wall_10" className='tile'/>
            <img src="/assets/Tiles/wall_11.png" alt="Tiles wall_11" className='tile'/>
            <img src="/assets/Tiles/wall_12.png" alt="Tiles wall_12" className='tile'/>
            <img src="/assets/Tiles/wall_13.png" alt="Tiles wall_13" className='tile'/>
            <img src="/assets/Tiles/wall_14.png" alt="Tiles wall_14" className='tile'/>
            <img src="/assets/Tiles/wall_15.png" alt="Tiles wall_15" className='tile'/>
            <img src="/assets/Tiles/wall_16.png" alt="Tiles wall_16" className='tile'/>
            <img src="/assets/Tiles/wall_17.png" alt="Tiles wall_17" className='tile'/>
            <img src="/assets/Tiles/wall_18.png" alt="Tiles wall_18" className='tile'/>
            <img src="/assets/Tiles/wall_2.png" alt="Tiles wall_2" className='tile'/>
            <img src="/assets/Tiles/wall_3.png" alt="Tiles wall_3" className='tile'/>
            <img src="/assets/Tiles/wall_4.png" alt="Tiles wall_4" className='tile'/>
            <img src="/assets/Tiles/wall_5.png" alt="Tiles wall_5" className='tile'/>
            <img src="/assets/Tiles/wall_6.png" alt="Tiles wall_6" className='tile'/>
            <img src="/assets/Tiles/wall_7.png" alt="Tiles wall_7" className='tile'/>
            <img src="/assets/Tiles/wall_8.png" alt="Tiles wall_8" className='tile'/>
            <img src="/assets/Tiles/wall_9.png" alt="Tiles wall_9" className='tile'/>
            <img src="/assets/Tiles/window_big_1.png" alt="Tiles window_big_1" className='tile'/>
            <img src="/assets/Tiles/window_big_2.png" alt="Tiles window_big_2" className='tile'/>
            <img src="/assets/Tiles/window_big_3.png" alt="Tiles window_big_3" className='tile'/>
            <img src="/assets/Tiles/window_big_4.png" alt="Tiles window_big_4" className='tile'/>
            <img src="/assets/Tiles/window_big_5.png" alt="Tiles window_big_5" className='tile'/>
            <img src="/assets/Tiles/window_big_6.png" alt="Tiles window_big_6" className='tile'/>
            <img src="/assets/Tiles/window_glass_1.png" alt="Tiles window_glass_1" className='tile'/>
            <img src="/assets/Tiles/window_glass_2.png" alt="Tiles window_glass_2" className='tile'/>
            <img src="/assets/Tiles/window_glass_tall_1.png" alt="Tiles window_glass_tall_1" className='tile'/>
            <img src="/assets/Tiles/window_glass_tall_2.png" alt="Tiles window_glass_tall_2" className='tile'/>
            <img src="/assets/Tiles/window_glass_tall_3.png" alt="Tiles window_glass_tall_3" className='tile'/>
            <img src="/assets/Tiles/window_small_1.png" alt="Tiles window_small_1" className='tile'/>
            <img src="/assets/Tiles/window_small_2.png" alt="Tiles window_small_2" className='tile'/>
            <img src="/assets/Tiles/window_tall_1.png" alt="Tiles window_tall_1" className='tile'/>
            <img src="/assets/Tiles/window_tall_2.png" alt="Tiles window_tall_2" className='tile'/>
            <img src="/assets/Tiles/window_tall_3.png" alt="Tiles window_tall_3" className='tile'/>
          </div>

          
        </div>
      </section>

      
      <section id="faq" className='faq'>
        <h2>Preguntas Frecuentes (FAQ)</h2>
        <ul className='faq-list'>
          <dt><b>¿En qué plataformas estará disponible Rouge?</b></dt><dd>Rouge estará disponible para PC, Mac y consolas.</dd>
          <dt><b>¿Habrá actualizaciones o contenido adicional después del lanzamiento?</b></dt><dd>Sí, planeamos lanzar actualizaciones periódicas con nuevo contenido, mejoras y correcciones de errores para mantener la experiencia fresca y emocionante.</dd>
          <dt><b>¿Puedo jugar a Rouge en modo cooperativo?</b></dt><dd>Actualmente, Rouge es un juego para un solo jugador, pero estamos considerando la posibilidad de agregar un modo cooperativo en el futuro.</dd>
          <dt><b>¿Qué tipo de historia puedo esperar en Rouge?</b></dt><dd>Rouge presenta una narrativa envolvente que se adapta a tus elecciones. Cada decisión que tomes influirá en el desarrollo de la historia, creando una experiencia única para cada jugador.</dd>
        </ul>
      </section>
      </div>
  );
}
function AnimatedDecoration({ title, frames, interval = 120 }) {
            const [frame, setFrame] = useState(0);
            useEffect(() => {
              const id = setInterval(() => {
                setFrame(f => (f + 1) % frames.length);
              }, interval);
              return () => clearInterval(id);
            }, [frames, interval]);
            return (
              <div style={{ display: 'inline-block', margin: 10, textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{title}</div>
                <img src={frames[frame]} alt={title} className='decoracion' style={{imageRendering:'pixelated', width:64, height:64}} />
              </div>
            );
          }
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
