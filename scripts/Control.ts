// import * as WitService from "TFS/WorkItemTracking/Services";
import { WorkItemTypeClass } from "TFS/WorkItemTracking/ProcessContracts";
import { ErrorView } from "./ErrorView";
import { Fields } from "./Fields";
import { View } from "./view";

export class Controller
{
   private input;
   private fields: Fields;
   private view: View;

   constructor ()
   {
      this.input = VSS.getConfiguration().witInputs;

      this.fields = new Fields(this.input);
      this.view = new View(this.fields);

      VSS.resize();
   }

   private _handleError(error: string): void
   {
      new ErrorView(error);
   }
}