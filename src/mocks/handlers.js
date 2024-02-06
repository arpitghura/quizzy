import { http, HttpResponse } from "msw";
import apiRes from "./apiResponse";

console.log(apiRes);
// Define request handlers and response resolvers
export const handlers = [
  http.get(
    "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
    () => {
      return HttpResponse.json(apiRes, { status: 200 });
    }
  ),
];
