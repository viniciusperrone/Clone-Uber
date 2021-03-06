import React, { useState } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { KEY_API } from '@env';

type SearchProps = {
    onLocationSelected: (data: Object, details: Object) => void;
};
const Search: React.FC<SearchProps> = ({ onLocationSelected }) => {
    const[searchFocused, setSearchFocused] = useState(false);
    return (
        <GooglePlacesAutocomplete
            placeholder='Para onde vamos?'
            query={{
                key: KEY_API,
                language: 'pt'
            }}
            onPress={(data, details) => { onLocationSelected(data, Object(details)) }}
            textInputProps={{
                onFocus: () => setSearchFocused(true),
                onBlur: () => setSearchFocused(false),
                autoCapitalize: 'none',
                autoCorrect: false
            }}
            listViewDisplayed={searchFocused}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: Platform.select({ ios: 60, android: 40 }),
                    width: '100%'
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    height: 54,
                    margin: 0,
                    borderRadius: 0,
                    borderBottomWidth: 0,
                    elevation: 5,
                    textDecorationLine: 'none',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: '#DDD',
                    fontSize: 18
                },
                listView: {
                    borderWidth: 1,
                    borderColor: '#DDD',
                    backgroundColor: '#FFF',
                    marginHorizontal: 20,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    marginTop: 10
                },
                description: {
                    fontSize: 16
                },
                row: {
                    padding: 20,
                    height: 58
                }

            }}
        />
    );
}

export default Search;