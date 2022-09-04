import classes from "../styles/illustration.module.css";

export default function Illustration({ Image, alt }) {
  return (
    <div className={classes.illustration}>
      <img src={Image} alt={alt} />
    </div>
  );
}
