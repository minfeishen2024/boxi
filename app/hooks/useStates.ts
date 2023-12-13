import {Country, State, City} from 'country-state-city';


const usStates = State.getStatesOfCountry('US');
// const usCities = City.getCitiesOfCountry('US');

type StateType = {
    name: string;
    value: string;
    latitude?: string;
    longitude?: string;
};

const formattedStates = usStates.map((state) => ({
    value: state.isoCode,
    label: state.name,
    lat: state.latitude,
    long: state.longitude,
}))


const useUSStates = () => {
    const getAll = () => formattedStates;
    const getByValue = (value: string) => {
        return formattedStates.find((item) => item.value === value)
    }

    

    return{
        getAll,
        getByValue,
    }

}

export default useUSStates;