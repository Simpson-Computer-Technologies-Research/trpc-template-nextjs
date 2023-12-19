interface Input {
  text: string;
}

export function PUT(input: Input) {
  // Mutation for databases, etc. goes here

  // Return the response
  const timestamp = new Date().getTime();
  const id = Math.floor(Math.random() * 1000);

  return {
    result: input.text,
    success: true,
    message: "Request successful",
    status: 200,
    timestamp,
    id,
  };
}
