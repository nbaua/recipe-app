import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { stackScreens } from '../../navigation/stack/masterStack';
import { Text } from 'react-native';

type propsType = NativeStackScreenProps<stackScreens, 'SearchScreen'>;
const SearchScreen = (props: propsType) => {
    return (
        <>
            <Text>Related search</Text>
        </>)
}
export default SearchScreen;
