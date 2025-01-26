import AchromaticButton from "../../atom/button/achromatic-button"

export default function VirtualPassword(){
  const PasswordInputs = Array.from({length:4}, (_,idx) => idx + 1).map((item, index)=>{
    return (
      <main key={index}>
        <AchromaticButton className="p-10">
          {item}
        </AchromaticButton>
      </main>
    )
  })
  return(
    <main>
      <div className="grid grid-cols-3 gap-3">
        {PasswordInputs}
      </div>
    </main>
  )
}