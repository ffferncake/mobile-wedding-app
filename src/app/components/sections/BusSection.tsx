import styles from "../../WeddingInvitation.module.css"

export default function BusSection() {
  return (
    <div id="location-bus" className={styles.inviteMessage}>
      <p className={styles.title_en}>BUS</p>
      <h3 className={styles.highlight}>버스 이용시</h3>

      <p>지선버스 : 6211, 6625</p>
      <p>간선버스 : 641</p>
      <p>마을버스 : 영등포12</p>
    </div>
  );
}