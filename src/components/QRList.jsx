import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import randomatic from 'randomatic';
import { isLoading } from 'expo-font';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Image
      style={styles.img}
      source={{
        uri:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAYAAAD6+a2dAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAAB3RJTUUH5QQbAi4lu0JfygAABHtJREFUeNrtnU9IVEEcx39PRatDxD67RAchEclFIa2DZEYIFW7ZrtUxy0i91CklVxT0YGF6MQi8SHURMlejrUsIgn/wb2GtqUEh3fqz0Kl0oZ0O7bzibcN7u+/PzDjzuSzv7e5vfjPzfb+Z+c3bfQASoVFoFVw0l3v43KrPp/SjpYw7HR3wHrpho6QEfsJdULOzaTeMY+yEZojGYlAAQchbXoYs5Rbq7eyMPPzWPbr3+XO33XFdAFrHX0UfM9qePXO7fGZ5AHnKht8fKYsujbwaG6PtjmN4D3i++DcXFrxeVQ0EEPJeV3cFulpbDz4GuHA+/Svfe9NzLTAzNKTZPas+9Zc3NVn2N2FHs5soJ117uJ7ePZ5P/pVgULN7T90XmJ2bc6rdSWS4XSB4lEHlZHExPoxXRH9kvunre3cRYPhJLJa23VNKOxybmNCOC1BY6a2stOyv3o6+nBTB9dzs8oxt1vT1aW+8RkFYLCmx7G+KuD4EYMXj40gkGg2FFMt+eBfV0tpDhYVwGTZQ3uqqU/4rMzCYmVlY+HZ3tGZ4eH2d1fYwi/sRwCH+jJ1ra6gBfqEr4+N228d27ep4Vsii7YDdrNyIfh89U1Vlu+EbABCiXTv72TYRQJIeUgCCIwUgOFIAgiMFIDhSAIIjBSA4UgCCIwUgOFIAgiMFIDjMCsBbrLb7P0xPa/vl+PWR+jQQnpyk7R/v/mKYFQDE4b7SXF6uP40+o1m0/+/2KTPchDJlNR5POt8D9TB49Cht90hwsxuo7ZM3w20Wd+Uil6I1IV9FBT7W7/OzCrsCaIFBqJ+a0q74RMfjUEuKEEb2cEdpdhJXbtJ5i/ZJ/rMGd3cEWb2ycHkkP+yy71Z7WIXdCGASowYjdqjJKzRt+5zAvQDSRT9miwq7qwCH0ZZtjC/TnEbYCKBN8npoO0IX7gXg9BjM+xhvBH9DQGLylurXUB1qQB3/hHo8CSSct2xf8n/0qVLa/tCGdntwNwQkJWpICR6ziZxUv28yoUS7nczCnQC0nHti8pa0N6B73xB9rt5IOKTPczqZ5E4ASVeYLoFj9go0G3LtyhCyCncCsC1Xb7a8bdrxGP5WAal2PMbstqzBKsD0aoITuIsAeuzO1RtGiDSHHFbhLwI4DClFTLzjh5M7f0hwHwFshzSrT3V1wAkyAqSJ2/v2TsF9BKA1S98uqwNmIwBxu9alvYBU9wj0n5fbzQTM5r5p58hFqSezEUAP67Nt/SqBtj9mYVcAhJDL2+8CeE0QOQbtkMcatNuD3QggcQUpAMGRAhAcKQDBkQIQHCkAwZECEBwpAMGRAhAcKQDBkQIQHCkAweH+jiAj3P4dAW+4HwHwkzMTWH1eoCGkv28zwOlt5/z+/P7T+Tk52okjqBNObG051g6skPTgyMQDFB0XAiPgehaFPS9rj7e10X5wpPv/ElaXG/R/ra6GJTSgNIbDbpfPLItKSAlXV0d2fKscib144Vaxrg8B2kOSS5VGNODzQSPkQMv8vH5o2LbgeuJ6U+p4iQQAAH4D/z4+7nghmsgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMjdUMDI6NDY6MzcrMDA6MDBNquiBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTI3VDAyOjQ2OjM3KzAwOjAwPPdQPQAAAABJRU5ErkJggg==',
      }}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const QRList = ({ qrList }) => {
  const renderItem = ({ item }) => <Item title={item.data} />;
  const [text, setText] = useState(null);
  const [auxData, setAuxData] = useState([]);
  const [timeout, setTimeOut] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAuxData([...qrList]);
    setText(null);
  }, [qrList]);

  useEffect(() => {
    if (text) {
      if (text.trim() !== '') {
        if (timeout) {
          clearTimeout(timeout);
          setIsLoading(false);
        }
        setIsLoading(true);

        let PATTERN = new RegExp(String.raw`${text.toLowerCase()}`);

        setTimeOut(
          setTimeout(async () => {
            let auxData = await qrList.filter(function (obj) {
              return PATTERN.test(obj.data.toLowerCase());
            });
            setAuxData(auxData);
            setIsLoading(false);
          }, 300),
        );
      } else {
        clearTimeout(timeout);
        setIsLoading(false);
        setAuxData([...qrList]);
      }
    } else {
      clearTimeout(timeout);
      setIsLoading(false);
      setAuxData([...qrList]);
    }
  }, [text]);

  return (
    <View style={styles.container} id='scene2'>
      <StatusBar barStyle='dark-content' />
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder='Search a QR Code'
      />
      <ActivityIndicator
        size='small'
        color='#2c1352'
        animating={isLoading}
        style={styles.indicator}
      />
      <SafeAreaView style={styles.subContainer}>
        <FlatList
          style={styles.list}
          data={auxData}
          renderItem={renderItem}
          keyExtractor={(item) => randomatic('AAAA')}
        />
        {/*qrList.length > 0 && qrList.map((qrInfo, i) => <Text key={i}> {qrInfo.data} </Text>)*/}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  qrList: state.qrReducer.qrList,
});
export default connect(mapStateToProps, {})(QRList);

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    color: '#2c1352',
    // paddingRight: 80,
    width: '80%',
  },
  list: {
    width: '90%',
    maxWidth: '95%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  img: {
    width: 64,
    height: 64,
  },
  input: {
    marginTop: StatusBar.currentHeight + 80 || 0,
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 10,
  },
  indicator: {
    marginTop: 15,
  },
});
