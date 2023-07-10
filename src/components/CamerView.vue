<template> 
  <div>
    <div>
      &emsp;&emsp;&emsp;&emsp;<b-button v-b-modal.modal-main id="create" @click="createForm($route.params.className)">Create {{$route.params.className}}</b-button>
      <b-button id="save" @click="saveForm" hidden="true">Save  {{$route.params.className}}</b-button>
      <b-button id="delete" @click="deleteNodes" hidden="true">Delete  {{$route.params.className}}</b-button>
      <b-button id="cancel" @click="unClickAllNodes" hidden="true">Cancel</b-button>
    </div>

    <div id="tree" v-if="posts">
      <input v-model="search" placeholder="Search" type="text" class="mt-0" style='float: right'/>
      <div v-for="result in posts" :key="result.id" v-if="count <= keysLimit">
        <div v-for="keyValue in Object.entries(result)" :key="keyValue[0]">
          <div :set="count++"></div>
          <div :set="keysLimit = keyValue.length"></div>
          <div :set="keys.push(keyValue[0])"></div>
          <div v-if="keyValue[1] !== null && typeof keyValue[1] === 'object'"><div :set="relationMappingsKey = keyValue[0]"></div></div>
        </div>
      </div>
      <div v-if="fieldsToDisplayOnTreeView.length !== 0">
        <div :set="keys.splice(0,keys.length)"></div>
        <div v-for="key in fieldsToDisplayOnTreeView" :key="Object.entries(key)[0][0]"><div :set="keys.push(Object.entries(key)[0][0])"></div></div>
      </div>
      <table> <!-- To be sorted: https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs -->
        <tr>
          <th>
            &emsp;&emsp;&emsp;<b-button id="select" hidden="true" @click="clickAllNodes">Select All {{$route.params.className}}</b-button>
          </th>
          <th v-for="key in fieldsToDisplayOnTreeView" @click="sort(Object.entries(key)[0][0])" :id="`${Object.entries(key)[0][0]}`" :key="Object.entries(key)[0][0]">{{Object.entries(key)[0][1] === "" ? capitalize(Object.entries(key)[0][0]):Object.entries(key)[0][1]}}</th>
        </tr> 
        <tr v-for="result in sortedPosts" :key="result.id" v-if="fieldsToDisplayOnTreeView.length !== 0">
          <td>&emsp;&emsp;&emsp;&emsp;<input :id="`node_${$route.params.className}_${result.id}`" type="checkbox" :name="`node_${result.id}`" @click="clickNode($route.params.className, result.id)"></td>
          <td v-for="key in keys" :key="key">
            <div v-if="result[key] !== null && typeof result[key] === 'object'"><div v-for="result in result[key]" :key="result.id"><router-link :to="`/view/${key}/${result.id}`" target='_blank' exact>{{key}} #{{result.id}}</router-link></div></div>
            <div v-else>{{result[key]}}</div>
          </td>
          <td><br>
            <p><button v-b-modal.modal-main :id="`btnView_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='viewFunction($route.params.className, result.id)'> 
              <i class='glyphicon glyphicon-eye-open'></i> {{ $t('View') }}
            </button>
            <button v-b-modal.modal-main :id="`btnEdit_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='editFunction($route.params.className, result.id)'>
              <i class='glyphicon glyphicon-edit'></i> {{ $t('Edit') }}
            </button>
            <button :id="`btnDel_${$route.params.className}_${result.id}`" class='btn btn-primary' style='float: right' @click='deleteFunction($route.params.className, result.id)'>
              <i class='glyphicon glyphicon-trash'></i> {{ $t('Del') }}
            </button></p>
            <br><br>
            <p v-if="relationMappingsKey !== '' && keys.includes(relationMappingsKey)">
            <button v-b-modal.modal-main :id="`btnAdd_${relationMappingsKey}_${result.id}`" class='btn btn-primary' style='float: right' @click='addChildFunction(relationMappingsKey, result.id)'>
              <i class='glyphicon glyphicon-list'></i> Add {{relationMappingsKey}}
            </button></p><br><br>
          </td><p></p>
        </tr>
      </table>
      <p>
        &emsp;&emsp;&emsp;&ensp;<b-button id="prev" @click="prevPage">Previous</b-button> 
        <b-button id="next" @click="nextPage">Next</b-button>
      </p>
    </div> <!-- tree view ends here -->
    <div v-else-if="errors && errors.length">
      <li v-for="error of errors" :key="error">
        {{error.message}}
      </li>
    </div>

    <div id="form" v-if="posts"> <!-- form view begins here -->
      <b-modal id="modal-main" :title="capitalize(`${formName}`)" @ok="okForm(formName)" scrollable="true" size="xl"> <!-- modal-class="modal-fullscreen"-->
        <form id="modal-form">
          <div v-if="view"><b-button id='update' @click='updateFunction'>Edit</b-button></div>
        </form>
      </b-modal>
    </div> <!-- form view ends here -->
    <div v-else-if="errors && errors.length">
      <li v-for="error of errors" :key="error">
        {{error.message}}
      </li>
    </div>
    <div id="menu">
       <camer-menu :menu="menu" collapsed="true"/>
    </div>

    debug: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}, length={{posts.length}}, search={{search}}, fieldsToDisplayOnTreeView={{fieldsToDisplayOnTreeView.length}}
  </div>
</template>
<script src="./static/src/js/camer/camer_view.js"></script>
<style scoped src="./static/src/css/camer/camer_view.css"></style>