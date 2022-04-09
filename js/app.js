document.addEventListener("DOMContentLoaded", function () {
  const tab = document.querySelectorAll("tr");
  const currentData = document.querySelector('input[type="date"]');
  const converterTo = document.querySelector(".converter__to");
  const converterFrom = document.querySelector(".converter__from");
  currentData.valueAsDate = new Date();
  let uri = "https://www.nbrb.by/api/exrates/rates?periodicity=0";

  currentData.addEventListener("change", function () {
    document.getElementById("choosedData").querySelector("span").innerHTML =
      currentData.value.toString();
  });

  document.getElementById("choosedData").querySelector("span").innerHTML +=
    new Date().toLocaleDateString();

  document.querySelector(".from").addEventListener("click", function (event) {
    if (event.target.type == "radio") {
      converterFrom.querySelector(".value_from").innerHTML = event.target.id;
      converterTo.querySelector(".value_to").innerHTML = event.target.id;
      ratetoday(event.target.id);
    }
  });

  function ratetoday(id) {
    fetch(uri)
    .then(status)
    .then(json)
    .then(function (data) {
        data.forEach((element) => {
            if (element.Cur_Abbreviation == id) {
            //   document.querySelector("#curency_to").value = (
            //     document.querySelector("#curency_from").value /
            //     element.Cur_OfficialRate
            //   ).toFixed(3);
              cvt.querySelector(".value_to").innerHTML =
                element.Cur_OfficialRate +" "+ id;
              cvf.querySelector(".value_to").innerHTML =
                (1 / element.Cur_OfficialRate).toFixed(3) + " USD";
            }
          });
    })
    .catch(function (error) {
      console.log("error", error);
    });
  }

  document.querySelector(".to").addEventListener("click", function (event) {
    if (event.target.type == "radio") {
      converterTo.querySelector(".value_from").innerHTML = event.target.id;
      converterFrom.querySelector(".value_to").innerHTML = event.target.id;
    }
  });

  const tableWell = document.querySelectorAll("tbody tr");

  document.querySelector(".showMore").addEventListener("click", function () {
    tab.forEach((element, index) => {
      if (element.classList == "add") {
        element.classList.remove("add");
      } else {
        if (index > 3) {
          element.classList.add("add");
        }
      }
    });
  });

  const cvf = document.querySelector(".converter__from");
  const cvt = document.querySelector(".converter__to");

  //   getCurrencies();
  //   async function getCurrencies(){
  //       const response = await fetch(uri)
  //       const data =  await response.json();
  //       const result = await data;
  //       result.forEach(element => {
  //           if(element.Cur_Abbreviation == 'USD'){
  //             document.querySelector('#curency_to').value =  (document.querySelector('#curency_from').value / element.Cur_OfficialRate).toFixed(3)
  //             cvt.querySelector('.value_to').innerHTML = element.Cur_OfficialRate + " BYN"
  //             cvf.querySelector('.value_to').innerHTML = (1/element.Cur_OfficialRate).toFixed(3) + " USD"
  //           }

  //       });
  //       tableWell.forEach(trg => {
  //         result.forEach(element => {
  //             if( trg.children[1].innerHTML == element.Cur_Abbreviation){
  //                 trg.children[2].innerHTML =  element.Cur_OfficialRate.toFixed(3)
  //             }
  //         });
  //     });
  //   }

  var status = function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
  };
  var json = function (response) {
    return response.json();
  };

  fetch(uri)
    .then(status)
    .then(json)
    .then(function (data) {
      data.forEach((element) => {
        if (element.Cur_Abbreviation == "USD") {
          document.querySelector("#curency_to").value = (
            document.querySelector("#curency_from").value /
            element.Cur_OfficialRate
          ).toFixed(3);
          cvt.querySelector(".value_to").innerHTML =
            element.Cur_OfficialRate + " BYN";
          cvf.querySelector(".value_to").innerHTML =
            (1 / element.Cur_OfficialRate).toFixed(3) + " USD";
        }
      });
      tableWell.forEach((trg) => {
        data.forEach((element) => {
          if (trg.children[1].innerHTML == element.Cur_Abbreviation) {
            trg.children[2].innerHTML = element.Cur_OfficialRate.toFixed(3);
          }
        });
      });
    })
    .catch(function (error) {
      console.log("error", error);
    });
});
