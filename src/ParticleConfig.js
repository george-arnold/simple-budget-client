import React, { Component } from 'react';
import Particles from 'react-particles-js'

class ParticleConfig extends Component {
  render() {
    return (
      <Particles className="Particles"
        params={{
          particles: {
            number: {
              value: 43,
              density: {
                enable: true,
                value_area: 1122.388442605866
              }
            },
            shape: {
              type: 'image',
              stroke: {
                width: 8,
                color: '#000000'
              },
              polygon: {
                nb_sides: 3
              },
              image: {
                src:
                  'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/money-circle-green-3-512.png',
                width: 200,
                height: 200
              }
            },
            opacity: {
              value: 0.03206824121731046,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 50,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: '#000000',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'bottom-right',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        }}
      />
    );
  }
}
export default ParticleConfig;
