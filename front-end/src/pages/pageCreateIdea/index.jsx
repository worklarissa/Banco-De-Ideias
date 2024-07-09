import { IdeaForm } from "../../components/form";
import logo from "../../assets/banner.png";
import "./pageCreateIdea.css";
import { motion as m } from "framer-motion";

const PageCreateIdea = () => {
 
  return (
    <m.div className="pageCreateIdea"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 0 }}
    >
      <h1 className="title-create-idea">Crie sua ideia!</h1>
      <div className="create">
        <IdeaForm />

        <img className="banner" src={logo} width={400} height={500} />
      </div>
    </m.div>
  );
};

export default PageCreateIdea