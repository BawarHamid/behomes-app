import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  btn: {
    backgroundColor: Colors["primary-red"],
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "mon-bold",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopColor: Colors["primary-grey"],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  btnOutline: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors["primary-medium-black"],
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "mon-semi-bold",
  },
});

export const stylesLoginModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    padding: 26,
  },
  viewSeparator: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  textSeparator: {
    fontFamily: "mon-semi-bold",
    color: Colors["primary-medium-black"],
  },
});
