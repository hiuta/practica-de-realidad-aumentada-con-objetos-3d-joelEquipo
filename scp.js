window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    //button.innerText = '﹖';
    button.innerText = 'Cambiar';
    let places = staticLoadPlaces();
   renderPlaces(places);
};
function staticLoadPlaces() {
    return [
        {
            name: 'blusa1',
            location: {
                // decomment the following and add coordinates:
                lat: 17.1004375,
                lng: -97.8765625,
            },
        },
    ];
}


var models = [
    {
        url: 'blusa1.glb',
        scale: '30 30 30'
        info: 'Blusa1',
        rotation: '0 10 0',
    },
    {
        url: 'blusars.glb',
        scale: '10 10 10',
        rotation: '0 90 0',
        info: 'Blusa2',
    },
    {
        url: 'rebozo.glb',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Rebozo',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
