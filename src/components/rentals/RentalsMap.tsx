import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import Colors from "@/src/constants/Colors";

type RentalsMapProps = {
  rentals: any;
};

const INITIAL_REGION = {
  latitude: 55.6761,
  longitude: 12.5683,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const RentalsMap: React.FC<RentalsMapProps> = memo(({ rentals }) => {
  const router = useRouter();

  const onMarkerSelected = (event: any) => {
    router.push(`/rental/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        onPress={onPress}
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text className="text-black items-center font-[mon-semi-bold]">
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View>
      <MapView
        animationEnabled={false}
        className="w-[100%] h-[100%]"
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor="#ffffff"
        clusterTextColor="#000000"
        clusterFontFamily="mon-semi-bold"
        renderCluster={renderCluster}
      >
        {rentals.features.map((rental: any) => (
          <Marker
            coordinate={{
              latitude: rental.properties.latitude,
              longitude: rental.properties.longitude,
            }}
            key={rental.properties.id}
            onPress={() => onMarkerSelected(rental)}
          >
            <View style={styles.marker}>
              <Text className="text-sm font-[mon-semi-bold]">
                {rental.properties.price} DKK
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default RentalsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});
