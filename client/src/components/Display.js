import { useState } from "react";
import "./Display.css";
import axios from "axios";

const Display = ({ contract, account }) => {
const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    console.log(account, 'account address');//user-address
    dataArray = await contract.display(account)
    console.log(dataArray, "this is the image hash");
    // const Otheraddress = document.querySelector(".address").value;
    // try {
    //   if (Otheraddress) {
    //     dataArray = await contract.display(Otheraddress);
    //     console.log(dataArray);
    //   } else {
    //     dataArray = await contract.display(account);
    //   }
    // } catch (e) {
    //   alert("You don't have access");
    // }
    //  const images = dataArray.length;

    // if (images) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log("full",str);
      console.log("divided",str_array);
      const images = await Promise.all(str_array.map(async (item, i) => {
        console.log("displaying image",item)
        //  const image = await axios.get(item);
        //  console.log("got the image", image)
        return (
          <a href={item} key={i} target="blank">
            <img
              key={i}
              // src={image}
              src={item}
             // src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
              style={{width:100, height:100}}
            ></img>
          </a>
        );
      }));
      setData(images);
    // } else {
    //   alert("No image to display");
    // }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;