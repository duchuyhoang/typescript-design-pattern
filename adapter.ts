// class XMLFind
import { parseFromString } from "dom-parser";

class NetworkXMLRequest {
  constructor() {}

  doRequest(xmlString: string) {
    console.log(`Do request with :`, parseFromString(xmlString));
  }
}

const xml =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<note importance="high" logged="true">' +
  "    <title>Happy</title>" +
  "    <todo>Work</todo>" +
  "    <todo>Play</todo>" +
  "</note>";

const networkRq = new NetworkXMLRequest();

networkRq.doRequest(xml);

class NetworkXMLAdapter {
  constructor(private adaptee: NetworkXMLRequest) {}

  doRequestWithJson(jsonString: string) {
    // transform json to xml from here and pass to the params
    this.adaptee.doRequest(jsonString);
  }
}

const adapter = new NetworkXMLAdapter(new NetworkXMLRequest());

adapter.doRequestWithJson('{"JSON":true}');
