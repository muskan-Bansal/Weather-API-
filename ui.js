class Weather{
  constructor(city ){
    this.apiKey='e1bb7a586532786a25170c5de4cbbefe';
    this.city=city; 

  }
  // fetch weather from api 
  async getWeather(){
 
    let url='https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&appid='+this.apiKey;

    const response=await fetch(url,{mode:'cors'});
    const responsedata= await response.json();
    return responsedata;

  }
  // change weather locaion 
  changeLocation(city){
      this.city=city;
      // this.state=state
  }
}

// UI class
class UI{
  constructor(){
    //  this.location=document.querySelector('w-location');
     this.location=document.querySelector('#w-location');
     this.desc=document.querySelector('#w-desc');
     this.string=document.querySelector('#w-string');
    //  this.test=document.querySelector('#test');
     this.icon=document.querySelector('#w-icon');
     this.humidity=document.querySelector('#w-humidity');
     this.feelslike=document.querySelector('#w-feels-like');
     this.pressure=document.querySelector('#w-dewpoint');
     this.wind=document.querySelector('#w-wind');
  }
  paint(weather){
    function conversion(k){
      return Math.round(k-273.15) +'°C ('+Math.ceil((k-273.15)*1.8+32)+'°F)';
    }
    this.location.textContent=weather.name+' ,'+weather.sys.country;

    const temp=weather.main.temp
    this.string.textContent=conversion(temp);
    weather.weather.forEach((i)=>this.desc.textContent=i.description);
    // weather.weather.forEach((i)=>this.icon.setAttribute('src',i.icon)) ;

    const test=weather.weather[0].icon;
    this.icon.setAttribute('src',"http://openweathermap.org/img/wn/"+test+'@2x.png');
    this.humidity.textContent=' Relative Humidity : '+weather.main.humidity +'%';
    
    this.feelslike.textContent= 'Feels Like : '+conversion(weather.main.feels_like+2) +'';
    this.pressure.textContent= 'Pressure : '+weather.main.pressure;
    this.wind.textContent= 'wind Speed: '+ weather.wind.speed+'km/h';
  }
}
// app.js
const weather=new Weather( 'Bangalore');
const ui=new UI();
// set weathe on dom load
document.querySelector('#w-change-btn').addEventListener('click',(e)=>{
  const city=document.querySelector('#cityinput').value;
  weather.changeLocation(city); 
  getWeather();
})

// get weather on dom load
document.addEventListener('DOMContentLoaded',getWeather);
function getWeather(){
  weather.getWeather()
  .then(data=>
    {
      console.log(data);
      ui.paint(data);
    })
  .catch(err=>console.log(err));
  
}

