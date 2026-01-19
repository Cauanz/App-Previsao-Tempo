const formatForecastJSON = (obj) => {

  if (!obj) {
    return "No object was found!";
  }

  let curObj = obj?.current;
  let formattedCur = {
    last_updated_epoch: curObj.last_updated_epoch,
    last_updated: curObj.last_updated,
    temp_c: curObj.temp_c,
    condition: curObj.condition,
    wind_kph: curObj.wind_kph,
    wind_degree: curObj.wind_degree,
    wind_dir: curObj.wind_dir,
    pressure_mb: curObj.pressure_mb,
    precip_mm: curObj.precip_mm,
    humidity: curObj.humidity,
    cloud: curObj.cloud,
    feelslike_c: curObj.feelslike_c,
    windchill_c: curObj.windchill_c,
    heatindex_c: curObj.heatindex_c,
    dewpoint_c: curObj.dewpoint_c,
    vis_km: curObj.vis_km,
    uv: curObj.uv,
    gust_kph: curObj.gust_kph,
  };

  let foreObj = obj?.forecast;
  let formatedForecast = foreObj.forecastday.map((day) => ({
      date: day.date,
      date_epoch: day.date_epoch,
      day: {
        maxtemp_c: day.maxtemp_c,
        mintemp_c: day.mintemp_c,
        avgtemp_c: day.avgtemp_c,
        maxwind_kph: day.maxwind_kph,
        totalprecip_mm: day.totalprecip_mm,
        avgvis_km: day.avgvis_km,
        avghumidity: day.avghumidity,
        daily_chance_of_rain: day.daily_chance_of_rain,
        condition: day.condition,
        uv: 0.1
      },
      astro: day.astro,
      hour: day.hour?.map((hour) => ({
            time: hour.time,
            temp_c: hour.temp_c,
            is_day: hour.is_day,
            condition: hour.condition,
            wind_kph: hour.wind_kph,
            wind_degree: hour.wind_degree,
            wind_dir: hour.wind_dir,
            pressure_mb: hour.pressure_mb,
            precip_mm: hour.precip_mm,
            humidity: hour.humidity,
            cloud: hour.cloud,
            feelslike_c: hour.feelslike_c,
            windchill_c: hour.windchill_c,
            heatindex_c: hour.heatindex_c,
            dewpoint_c: hour.dewpoint_c,
            chance_of_rain: hour.chance_of_rain,
            vis_km: hour.vis_km,
            gust_kph: hour.gust_kph,
            uv: hour.uv,
      }))
    }))

  let newObj = {
    location: obj.location,
    current: formattedCur,
    forecast: formatedForecast,
  };

  return newObj;
};

module.exports = {
  formatForecastJSON,
};
