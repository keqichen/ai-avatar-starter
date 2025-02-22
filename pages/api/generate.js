const generateAction = async (req, res) => {
    console.log('Received request');

    const input = JSON.parse(req.body).input;

    const response = await fetch(
        `https://api-inference.huggingface.co/models/buildspace/ai-avatar-generator`,
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: input,
          }),
        }
      );
  };


  
  export default generateAction;