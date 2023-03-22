import { Fragment, useMemo, useState } from "react";
import { ShapeDetail } from "@/types/Document";

import styles from "./Shape.module.scss";
import { getStaticUrl } from "@/utils";

type ShapeProps = {} & ShapeDetail;

const Shape = ({ type, props }: ShapeProps) => {
  let [property, setProperty] = useState(props);

  let [isSelected, setIsSelected] = useState(false);

  let { width, height, translateX, translateY, rotate } = props;

  let handleFocus = () => {
    setIsSelected(true);
  };

  let handleBlur = () => {
    setIsSelected(false);
  };

  let path = useMemo(() => {
    switch (type) {
      case "arrow":
        return (
          <path d="M400 200 L400 200 L200 0 L200 66.66666666666666 L0 66.66666666666666 L0 333.33333333333337 L200 333.33333333333337 L200 400 Z"></path>
        );

      case "circle":
        return (
          <path d="M400 200.05612459660446 L400 200.05612459660446 L397.7559551191024 230.01062358435726 L391.0678213564271 259.29162741285654 L380.0876017520351 287.24167652187856 L365.0673013460269 313.2353825492594 L346.334926698534 336.6874461304095 L324.3184863697274 357.0686924973441 L299.51399027980557 373.92611597747003 L272.46944938898775 386.87887109382825 L243.79687593751873 395.6343081641244 L214.14428288565773 400 L184.17168343366868 399.8717152077612 L154.55509110182203 395.257471586923 L125.95851917038343 386.26150053117925 L99.02598051961039 373.0802381286456 L74.35748714974298 356.01836076088915 L52.513050261005226 335.4486961053539 L33.98067961359227 311.84028543366276 L19.176383527670552 285.7223035138007 L8.436168723374466 257.68004971035697 L1.992039840796816 228.34292128525325 L0 198.3723866984706 L2.49604992099842 168.4379322095051 L9.428188563771275 139.2130529776103 L20.640412808256162 111.35520856300988 L35.880717614352285 85.48978732786787 L54.80509610192203 62.19807973701618 L76.9935398707974 42.00124275892481 L101.94203884077682 25.35228206618693 L129.09458189163783 12.628034236003929 L157.8351567031341 4.1131311511555655 L187.5277505550111 0 L217.49634992699853 0.3808454769588486 L247.0729414588292 5.243640882759727 L275.5935118702374 14.480145923951174 L302.4140482809656 27.885906712902646 L326.93853877077544 45.16025576780453 L348.6069721394428 65.91032091242559 L366.9433388667773 89.67507867465774 L381.5276305526111 115.91733648700114 L392.03584071681433 144.04778608510895 L398.2279645592912 173.43703020705968 L400 200.05612459660446 Z"></path>
        );

      case "diamond":
        return <path d="M200 400 L200 400 L0 200 L200 0 L400 200 Z"></path>;

      case "rectangle":
        return (
          <path
            d={`M0 0 L0 0 L0 ${height} L${width} ${height} L${width} 0 Z`}
          ></path>
        );

      case "semi-circle":
        return (
          <path d="M0 200 L0 200 L2.244 170.03709273182957 L8.932 140.74786967418547 L19.912 112.78997493734335 L34.932 86.7889724310777 L53.664 63.33032581453635 L75.67999999999999 42.94335839598997 L100.484 26.081203007518805 L127.52799999999999 13.124812030075194 L156.20000000000002 4.366917293233078 L185.852 0 L215.82399999999998 0.12832080200500978 L245.44000000000003 4.743859649122801 L274.036 13.742355889724303 L300.968 26.92731829573934 L325.63599999999997 43.99398496240601 L347.48 64.56942355889723 L366.012 88.18446115288222 L380.816 114.30977443609021 L391.55600000000004 142.35989974937343 L398 171.70526315789476 L400 200 L0 200 Z"></path>
        );

      case "square":
        return (
          <path
            d={`M0 0 L0 0 L0 ${height} L${width} ${height} L${width} 0 Z`}
          />
        );

      case "triangle":
        return (
          <Fragment>
            <path
              d={`M${width} ${height} L${width} ${height} L0 ${height} L${
                width / 2
              } 0 Z`}
            ></path>
            <path
              d={`M${width} ${height} L${width} ${height} L0 ${height} L${
                width / 2
              } 0 Z`}
            ></path>
          </Fragment>
        );

      default:
        return null;
    }
  }, [type, height, width]);

  return (
    <div
      className={styles.container}
      data-selected={isSelected}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(1) rotate(${rotate}rad)`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        {path}
      </svg>
      {true && (
        <div className={styles.resizer}>
          <div className={styles.top_left} data-circle>
            <img src={getStaticUrl("/rotate.svg")} />
          </div>
          <div className={styles.top_center} data-square></div>
          <div className={styles.top_right}></div>
          <div className={styles.left} data-square></div>
          <div className={styles.right} data-square></div>
          <div className={styles.bottom_left} data-circle></div>
          <div className={styles.bottom_center} data-square></div>
          <div className={styles.bottom_right} data-circle></div>
        </div>
      )}
    </div>
  );
};

export default Shape;
