import Weather from './Weather';

function RecentSearch({ data, region }) {
  if (data && data.cod === 200) {
    return (
      <div>
        <Weather data={data} city={region} />
      </div>
    );
  } else {
    return <p className='blank'>Enter a location or select from Recent searches to get weather information</p>;
  }
}
export default RecentSearch;