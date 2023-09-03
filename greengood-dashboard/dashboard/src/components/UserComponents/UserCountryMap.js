import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';

highchartsMap(Highcharts)

const UserCountryMap = () => {
    // Define state variables, DOM reference variable and state-updating functions
    const chartRef = useRef(null);
    const [usersPerCountry, setUsersPerCountry] = useState([]);
    const [countriesMap, setCountriesMap] = useState([])
    // Define useEffect hook to manipulate data being fetched from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mapResponse = await fetch('https://code.highcharts.com/mapdata/custom/south-america.topo.json');
                const countriesMap = await mapResponse.json();
                const usersResponse = await fetch('http://localhost:3001/api/user/users-per-country')
                const usersPerCountry = await usersResponse.json();
                //Update state variable value
                setUsersPerCountry(usersPerCountry)
                setCountriesMap(countriesMap)

                let defaultColor = '#3B246B'
                // Create new array to include the default color for each country
                const cleanList = [];
                for (let i = 0; i < usersPerCountry.countryData.length; i += 1) {
                    const countryCode = usersPerCountry.countryData[i][0];
                    const value = usersPerCountry.countryData[i][1];
                    cleanList.push({ 'hc-key': countryCode, value, color: defaultColor });
                }

                // Set up chart options
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
                        minColor: '#E6DEE9',
                        maxColor: defaultColor,
                      },
                    series: [
                        {
                            data: cleanList,
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
                // verify if the DOM reference element exists to render the chart
                if (chartRef.current) {
                    Highcharts.mapChart(chartRef.current, options);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);

    // Return temporary element while the data is being fetched
    if (!usersPerCountry || !countriesMap) {
        return (<div>Cargando información...</div>)
    }
    
    // Render a DIV element based on the created reference pointing towards the Map chart
    return (<div className='container border border-secondary p-0' ref={chartRef}></div>)

};

export default UserCountryMap;
