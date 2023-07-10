
        <!-- <b-list-group-item v-for="post in posts" :key="post.id">
          <tree :data="post" node-text="name" layoutType="horizontal" nodeTextDisplay="all">
        </tree>
        </b-list-group-item> -->

        <!-- <b-tree-view :data="posts" v-for="result in posts" :key="result.id"><button :id="`btnView_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='viewFunction'> 
                <i class='glyphicon glyphicon-eye-open'></i> view
              </button>
              <button :id="`btnEdit_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='editFunction'>
                <i class='glyphicon glyphicon-edit'></i> Edit
              </button>
              <button :id="`btnDel_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='deleteFunction'>
                <i class='glyphicon glyphicon-trash'></i> Del
              </button></b-tree-view> -->
<template>
  <div>
    <button id="create" @click="createForm">Create</button>
    <button id="save" @click="saveForm" hidden="true">Save</button>
    <button id="select" @click="clickAllNodes">Select All</button>
    <button id="delete" @click="deleteNodes" hidden="true">Delete</button>
    <button id="cancel" @click="unClickAllNodes" hidden="true">Cancel</button>
    <p><div></div></p>
    <vue-tabs active-tab-color="#e74c3c" 
         active-text-color="white"
         type="pills"
         :start-index="1"
    >
      <v-tab title="Tree View" icon="class='glyphicon glyphicon-trash'">
        <div id="tree" v-if="posts"><!-- tree view begins here -->
        <!-- <div v-for="result in posts" :key="result.id" v-if="count <= keysLimit">
          <div v-for="keyValue in Object.entries(result)">
            <div :set="count++"></div>
            <div :set="keysLimit = keyValue.length"></div>
            <div :set="keys.push(keyValue[0])"></div>
            <div v-if="keyValue[1] !== null && typeof keyValue[1] === 'object'"><div :set="relationMappingsKey = keyValue[0]"></div></div>
          </div>
        </div>
        <div v-if="fieldsToDisplayOnTreeView.length !== 0"><div :set="keys.splice(0,keys.length)"></div></div>
        <div v-for="key in fieldsToDisplayOnTreeView"><div :set="keys.push(key)"></div></div>
        <table>
          <tr><pre>    </pre>
            <th v-for="key in keys">
              <div><pre>    {{key}}    </pre></div>
            </th>
          </tr>
          <tr v-for="result in posts" :key="result.id" @click="selectRow(result.id)" :class="{'highlight': (result.id == selectedUser)}">
            <td class="mb-1"><pre><input :id="`node_${result.id}`" type="checkbox" :name="`node_${result.id}`" @click="clickNode(result.id)">    </pre></td>
            <td v-for="key in keys">
              <div v-if="result[key] !== null && typeof result[key] === 'object'"><pre v-for="result in result[key]" :key="result.id">    <router-link :to="`/view/${key}/${result.id}`" target='_blank' exact>{{key}}</router-link>    </pre></div>
              <div v-else><pre>    {{result[key]}}    </pre></div>
            </td>
            <td>
              <button :id="`btnView_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='viewFunction'> 
                <i class='glyphicon glyphicon-eye-open'></i> view
              </button>
              <button :id="`btnEdit_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='editFunction'>
                <i class='glyphicon glyphicon-edit'></i> Edit
              </button>
              <button :id="`btnDel_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='deleteFunction'>
                <i class='glyphicon glyphicon-trash'></i> Del
              </button>
            </td>
            <div v-if="$route.params.hasOwnProperty('id') && relationMappingsKey !== '' && keys.includes(relationMappingsKey)">
              <div><button :id="`btnAdd_${relationMappingsKey}_${result.id}`" class='btn btn-primary' style='float: right' @click='addChildFunction'>
                <i class='glyphicon glyphicon-trash'></i> Add {{relationMappingsKey}}
              </button></div>
            </div>
          </tr>
        </table> -->
      </div> <!-- tree view ends here -->
      <div v-else-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </div>
      </v-tab>

      <v-tab title="From View" icon="ti-settings">
        <div id="form" v-if="posts"> <!-- form view begins here -->
          <!-- form goes here -->
          <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td><td>
            <button :id="btnView" class='btn btn-primary' style='float: right' @click='viewFunction'> 
              <i class='glyphicon glyphicon-eye-open'></i> view
            </button>
            <button :id="btnEdit" class='btn btn-primary' style='float: right' @click='editFunction'>
              <i class='glyphicon glyphicon-edit'></i> Edit
            </button>
            <button :id="btnDel" class='btn btn-primary' style='float: right' @click='deleteFunction'>
              <i class='glyphicon glyphicon-trash'></i> Del
            </button>
          </td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
        </div> <!-- form view ends here -->
        <div v-else-if="errors && errors.length">
          <li v-for="error of errors">
            {{error.message}}
          </li>
        </div>
      </v-tab>

      <v-tab title="3D View" icon="ti-check">
        Third tab content
      </v-tab>
    </vue-tabs>
  </div>
</template>
<script src="./static/src/js/camer/camer_view.js"></script>
<!-- <style scoped src="./static/src/css/camer/bootstrap.css"></style> -->
<style scoped src="./static/src/css/camer/camer_view.css"></style>