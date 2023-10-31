import Weather from './Weather';
function RecentSearch({ data, region }) {
  if (region!==null&&data && data.cod === 200) {
    return (
        <Weather data={data} city={region} />
    );
  } else {
    return <p className='blank'>Enter a location or select from Recent searches to get weather information</p>;
  }
}
export default RecentSearch;