const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '718c83e13emsh3b0cc7755f0df41p18aa78jsnf8b87975f834',
		'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
	}
};

let mySel =document.querySelector('.sel_1')
let myReslut = document.querySelector('.reslt')
// console.log(myReslut);

fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/', options)
	.then(res => res.json())
    .then(data => {
        data.map((e)=>{
            // console.log(e);
            if (e.rank > 0) {
                let myRes = `
                <option>${e.Country}</option>
                `
                mySel.innerHTML += myRes
            }

        })

        mySel.addEventListener('change',()=>{
            let myCoun = mySel.value

        fetch(`https://weatherdbi.herokuapp.com/data/weather/${myCoun}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.next_days);
            // console.log(data);
            console.log(data);
            let mycurrentConditions = data.currentConditions
            let myObj1 = Object.values(mycurrentConditions)

            let counWrather = `
            <div>
                
                <div class="text-start row d-flex justify-content-evenly">
                    <div class="col-lg-6 lh-base" style="width: 10rem;">
                        <div class="fw-bold" style="font-size: 15px;">${myObj1[0]}</div>
                        <div class="fw-bold" style="font-size: 15px;">Temp : ${myObj1[1].c} C</div>
                        <div class="fw-bold" style="font-size: 15px;">precip : ${myObj1[2]}</div>
                        <div class="fw-bold" style="font-size: 15px;">humidity : ${myObj1[3]}</div>
                        <div class="fw-bold" style="font-size: 15px;">Wind : ${myObj1[4].km} km</div>
                    </div>
                    <div class="col-lg-6 " style="width: 5rem;">
                        <div class="fw-bold" style="font-size: 15px;">${data.region}</div>
                        <div class="d-flex align-items-center">
                            <img src="${myObj1[5]}" alt="">
                        </div>
                    </div>
                </div>  

                <div class="w-100 bg-dark" style="height: .1rem"></div>  

            </div>
            `
            myReslut.innerHTML = counWrather

                let myDays = document.querySelector('.days')
                console.log(myDays);
                let mynext_days = data.next_days
                mynext_days.map((e)=>{
                    console.log(e.day);
                    let myNextD = `

                        <div class="col-lg-6 d-flex justify-content-evenly border-bottom border-danger my-1" style="width: 12rem;">

                            <div class="col-lg-3 lh-sm" style="width: 8rem;">
                                <label class="fw-bold pt-0" style="font-size: 15px;">${e.day}</label><br>
                                <label class="fw-bold pt-0" style="font-size: 12px;">${e.comment}</label>
                                <label class="fw-bold pt-0" style="font-size: 10px;">max_temp : ${e.max_temp.c} C</label>
                                <label class="fw-bold pt-0" style="font-size: 10px;">min_temp : ${e.min_temp.c} C</label>


                            </div>
                            <div class="col-lg-3 d-flex align-items-center" style="width: 4rem;">
                                <img src="${e.iconURL}" alt="">
                            </div>

                        </div>
                
                    `
                    myDays.innerHTML += myNextD
                })
            });
        })
    })










