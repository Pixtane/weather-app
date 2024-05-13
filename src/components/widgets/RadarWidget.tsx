function RadarWidget() {
  return (
    <div className="infoBox">
      <h1 className="flex justify-center my-1 mb-3 w-full text-2xl font-semibold text-slate-100">
        Radar
      </h1>

      <div className="h-64 rounded-xl overflow-hidden -m-1">
        <iframe
          width="100%"
          height="100%"
          src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=5&overlay=wind&product=ecmwf&level=10h&lat=49.838&lon=30.322&detailLat=-56.07203547180087&detailLon=64.16015625000001&marker=true&message=true"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default RadarWidget;
