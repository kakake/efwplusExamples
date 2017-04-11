using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ${Entity.AppName}
{
    public class ${Entity.ClassName}
    {
#foreach($val in $Entity.Property) 
        private $val.TypeName $val.varName;
        /// <summary>
        /// $val.remarks
        /// </summary>
        public $val.TypeName $val.PropertyName
        {
            get { return $val.varName; }
            set { $val.varName = value; }
        }

#end
    }
}
