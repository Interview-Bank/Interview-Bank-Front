
interface LabelProps {
  text    : string;
}

const Label = ({ text }: LabelProps) => {
  return (
    <span>{text}</span>
  )
}

export { Label };
