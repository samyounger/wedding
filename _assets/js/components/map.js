function initMap() {

  var locations = {
    church: {
      lat: 55.5994627,
      lng: -2.731846,
      image: "http://edinburgh.anglican.org/wp-content/uploads/2016/04/Holy-Trinity-Melrose.png",
      address_1: "20 High Cross Avenue",
      address_2: "Melrose",
      address_3: "Berwickshire",
      address_4: "TD6 9SU"
    },
    whitslaid: {
      lat: 55.6929353,
      lng: -2.6996447,
      image: "http://edinburgh.anglican.org/wp-content/uploads/2016/04/Holy-Trinity-Melrose.png",
      address_1: "Whitslaid Farm",
      address_2: "Lauder",
      address_3: "Berwickshire",
      address_4: "TD2 6RZ"
    }
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    scrollwheel:  false
  });

  bounds  = new google.maps.LatLngBounds();

  for(var place in locations) {
    marker = new google.maps.Marker({
      position: locations[place],
      label: place,
      map: map,
      animation: google.maps.Animation.DROP
    })

    var infowindow = new google.maps.InfoWindow();


    marker.addListener('click', (function(marker) {

      var content = `
      <img src="${locations[place].image}">
        <p>${locations[place].address_1}</p>
        <p>${locations[place].address_2}</p>
        <p>${locations[place].address_3}</p>
        <p>${locations[place].address_4}</p>`;

      return function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
      infowindow.open(map, marker);
    })(marker));

    loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    bounds.extend(loc);
  }

  map.fitBounds(bounds);       // auto-zoom
  map.panToBounds(bounds);     // auto-center

}
