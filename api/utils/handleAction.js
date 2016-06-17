
export default function handleAction(action ,res)  {
  action.then(
      (result) => {
          res.json(result);
      }, 
      (reason) => {
        
          res.status(reason.status || 500).json(reason);
      }
  );
}