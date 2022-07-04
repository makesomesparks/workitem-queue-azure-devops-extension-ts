import axios, { AxiosResponse } from "axios";
import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import { WorkItemFormService } from "TFS/WorkItemTracking/Services";
import RestClient = require("TFS/WorkItemTracking/RestClient");
import WorkItemService = require("TFS/WorkItemTracking/Services");

export class documentBuild
{
   op: string;
   path: string;
   value: any;
}

export class Fields
{
   public buttonsName: string = "Queue WorkItem";
   public requestUrl: string;
   public parameters: Array<string[]>;
   public workItem: WorkItem;
   public jsonString: any;

   private client: RestClient.WorkItemTrackingHttpClient4_1;

   constructor (input: any)
   {
      this.client = RestClient.getClient();

      this.requestUrl = input[ "requestUrl" ];


      if (String(input[ "buttonsName" ]).trim().length > 0)
      {
         this.buttonsName = input[ "buttonsName" ];
      }

      String(input[ "buttonsName" ]).split(",").map((p: string) =>
      {
         const param = p.split("=");
         this.parameters.push(param);
      });

      console.log("this.parameters");
      console.log(this.parameters);

      this.initWorkItem();
   }

   private initWorkItem()
   {
      WorkItemFormService.getService().then((service) =>
      {
         service.getId().then((id) =>
         {
            this.client.getWorkItem(id).then((workItem) =>
            {
               this.workItem = workItem;
               this.jsonString = JSON.stringify(workItem);

               console.log("this.workItem");
               console.log(this.workItem);

               console.log("this.jsonString");
               console.log(this.jsonString);
            });
         });
      });
   }

   public buttonPressed(): void
   {
      let param = "";

      this.parameters.map((v) =>
      {
         if (v.length >= 1)
         {
            param += v[ 0 ];
         }

         if (v.length >= 2)
         {
            param += `=${ v[ 1 ] }`;
         }

         param += "&";
      });

      axios.post(this.requestUrl, param).then((response: AxiosResponse<any, any>) =>
      {
         console.log(response.data);
      });
   }
}