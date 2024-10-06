import * as React from 'react';
import { Stylesheet, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default Button = ({icon, size, color, style, onPress }) => {

    return (
        <TouchableOpacity style={[Stylesheet.button, size]} onPress={onPress}>
            <MaterialIcon 
                name = {icon}
                size = {size? size : 28} // min size of item is 28
                color = {color? color: '#f1f1f1'}
            />
        </TouchableOpacity>
    )

}

const styles = Stylesheet.create({
    button: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})