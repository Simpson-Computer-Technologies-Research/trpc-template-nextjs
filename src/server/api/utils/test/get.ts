interface Input {
  text: string;
}
export function GET(input: Input) {
  const timestamp = new Date().getTime();
  const id = Math.floor(Math.random() * 1000);

  // Return the response
  return {
    result: input.text,
    success: true,
    message: "Request successful",
    status: 200,
    timestamp,
    id,
  };
}
