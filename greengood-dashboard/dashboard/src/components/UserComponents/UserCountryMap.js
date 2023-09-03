import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';

highchartsMap(Highcharts)

const UserCountryMap = () => {

    const chartRef = useRef(null);
    const [usersPerCountry, setUsersPerCountry] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mapResponse = await fetch('https://code.highcharts.com/mapdata/custom/south-america.topo.json');
                const countriesMap = await mapResponse.json();
                // setCountriesMap(countriesMap)

                const usersResponse = await fetch('http://localhost:3001/api/user/users-per-country')
                const usersPerCountry = await usersResponse.json();

                setUsersPerCountry(usersPerCountry)

                const filteredList = usersPerCountry.countryData

                const options = {
                    chart: {
                        map: countriesMap,
                    },
                    title: {
                        text: 'Usuarios Registrados - Suramérica',
                    },
                    subtitle: {
                        text:
                            'Source map: <a href="http://code.highcharts.com/mapdata/custom/south-america.topo.json">South America</a>',
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom',
                        },
                    },
                    colorAxis: {
                        min: 0,
                    },
                    series: [
                        {
                            data: filteredList,
                            name: 'Número de usuarios',
                            states: {
                                hover: {
                                    color: '#C5FF78',
                                }
                            },
                            dataLabels: {
                                format: '{point.name}',
                            },
                        },
                    ],
                };

                if (chartRef.current) {
                    Highcharts.mapChart(chartRef.current, options);
                }

                console.log(filteredList)

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, []);

    return (<div ref={chartRef}></div>)
};

export default UserCountryMap;
