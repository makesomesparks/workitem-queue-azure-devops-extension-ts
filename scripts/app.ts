import { Controller } from "./Control";
import { IWorkItemLoadedArgs } from "TFS/WorkItemTracking/ExtensionContracts";
import { WorkItemFormService } from "TFS/WorkItemTracking/Services";
import { VssConnection } from "VSS/Service";

let control: Controller;

let provider = () =>
{
   return {
      onLoaded: (workItemLoadedArgs: IWorkItemLoadedArgs) =>
      {
         control = new Controller();
         VSS.resize();
      }
   };
};

VSS.register(VSS.getContribution().id, provider);